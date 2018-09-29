"use strict";

const express = require("express");
const sqlwrapper = require("../../model/wrapper");
const connection = require("../../model/connect");
const router = express.Router();

router.post("", async (req, res, next) => {
  if (!req.body || !req.body.tournamentId) {
    const err = new Error("Malformed Request");
    err.status = 400;
    next(err);
    return;
  }
  try {
    const c = connection.connect(
      req.app.get("databaseConfig").host,
      req.app.get("databaseConfig").username,
      req.app.get("databaseConfig").password,
      req.app.get("databaseConfig").schema
    );
    const tournamentObject = await sqlwrapper.getTournament(
      c,
      req.body.tournamentId
    );
    if (!tournamentObject[0]) {
      const err = new Error("Tournament does not exist!");
      err.status = 404;
      next(err);
      return;
    }
    if (req.headers.id === tournamentObject[0].creator) {
      const results = await sqlwrapper.deleteTournament(
        c,
        req.body.tournamentId
      );
      if (results.affectedRows > 0) {
        res.status(200);
        res.json({ deleteStatus: "success" });
      } else {
        const err = new Error(
          "Something went wrong, tournament exists but cannot be deleted!"
        );
        next(err);
      }
    } else {
      const err = new Error("You cannot delete this match!");
      err.status = 401;
      next(err);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
