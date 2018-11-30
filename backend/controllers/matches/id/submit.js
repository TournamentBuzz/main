"use strict";

const express = require("express");
const router = express.Router();
const sqlwrapper = require("../../../model/wrapper");

router.post("", async (req, res, next) => {
  if (!req.body || req.headers.matchId < 0) {
    const err = new Error("Malformed Request");
    err.status = 400;
    next(err);
    return;
  }
  try {
    const c = req.app.get("databaseConnection");
    const matchObject = await sqlwrapper.getMatch(c, req.body.matchId);
    if (!matchObject[0]) {
      const err = new Error("Match does not exist!");
      err.status = 404;
      next(err);
      return;
    }
    const tournamentObject = await sqlwrapper.getTournament(
      c,
      matchObject[0].tournament
    );
    if (!tournamentObject[0]) {
      const err = new Error(
        "Tournament does not exist, should not have happened!"
      );
      next(err);
      return;
    }
    const referees = await sqlwrapper.getReferees(c, tournamentObject[0].id);
    if (referees.includes(req.headers.id)) {
      await sqlwrapper.updateMatchField(
        c,
        req.headers.matchid,
        "scoreA",
        req.body.scoreA
      );
      await sqlwrapper.updateMatchField(
        c,
        req.headers.matchid,
        "scoreB",
        req.body.scoreB
      );
      await sqlwrapper.updateMatchField(
        c,
        req.headers.matchid,
        "winner",
        req.body.winner
      );
      res.status(200);
      res.json({ scoreSubmitSuccess: true });
    } else {
      const err = new Error("You cannot score this match!");
      err.status = 401;
      next(err);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
