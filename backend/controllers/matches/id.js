"use strict";

const express = require("express");
const router = express.Router();

const sqlwrapper = require("../../model/wrapper");
const connection = require("../../model/connect");
const verifyUtil = require("../../middleware/auth/verifyUtil");

router.get("/:id", async function(req, res, next) {
  try {
    const c = connection.connect(
      req.app.get("databaseConfig").host,
      req.app.get("databaseConfig").username,
      req.app.get("databaseConfig").password,
      req.app.get("databaseConfig").schema
    );
    let matchObject;
    if (verifyUtil.retrieveAndVerify(req)) {
      matchObject = await sqlwrapper.getMatch(c, req.param("id"));
      if (!matchObject[0]) {
        const err = new Error("Match does not exist!");
        err.status = 404;
        next(err);
        return;
      }
      const tournamentObject = await sqlwrapper.getTournament(
        matchObject[0].tournament
      );
      if (!tournamentObject[0]) {
        const err = new Error(
          "Tournament does not exist, should not have happened!"
        );
        next(err);
        return;
      }
      if (req.headers.id !== tournamentObject[0].creator) {
        matchObject = await sqlwrapper.getPublishedMatch(c, req.param("id"));
      }
    } else {
      matchObject = await sqlwrapper.getPublishedMatch(c, req.param("id"));
    }
    if (!matchObject[0]) {
      const err = new Error("Match does not exist!");
      err.status = 404;
      next(err);
      return;
    }
    res.status(200);
    res.json({ match: matchObject });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
