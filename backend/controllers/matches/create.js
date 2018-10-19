"use strict";

const express = require("express");
const sqlwrapper = require("../model/wrapper");
const connection = require("../model/connect");
const router = express.Router();

router.post("", async (req, res, next) => {
  if (!req.body || req.tournament < 0) {
    const err = new Error("Malformed Request");
    err.status = 400;
    next(err);
    return;
  }
  if (req.headers.id !== null) {
    try {
      const c = connection.connect(
        req.app.get("databaseConfig").host,
        req.app.get("databaseConfig").username,
        req.app.get("databaseConfig").password,
        req.app.get("databaseConfig").schema
      );
      const tournamentObject = await sqlwrapper.getTournament(
        c,
        req.body.tournament
      );
      if (!tournamentObject[0]) {
        const err = new Error("Tournament does not exist!");
        err.status = 404;
        next(err);
        return;
      }
      if (req.headers.id === tournamentObject[0].creator) {
        const rows = await sqlwrapper.createMatch(
          c,
          req.body.location,
          req.body.score,
          req.body.matchTime,
          req.body.matchName,
          req.body.tournament,
          req.body.teamA,
          req.body.teamB
        );
        res.status(200);
        res.json({ tournamentId: req.body.tournament, matchId: rows.insertId });
      } else {
        const err = new Error("You cannot create matches for this tournament!");
        err.status = 401;
        next(err);
      }
    } catch (err) {
      err.status = 500;
      next(err);
    }
  } else {
    const err = new Error("Invalid Credentials");
    err.status = 401;
    next(err);
  }
});

module.exports = router;
