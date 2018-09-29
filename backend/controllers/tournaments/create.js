"use strict";

const express = require("express");
const sqlwrapper = require("../../model/wrapper");
const connection = require("../../model/connect");
const router = express.Router();

router.post("", async (req, res, next) => {
  if (
    !req.body ||
    (req.body.teamEvent !== true && req.body.teamEvent !== false) ||
    !req.body.scoringType ||
    !req.body.tournamentType ||
    req.body.entryCost < 0 ||
    req.body.maxParticipants < 0
  ) {
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
      const rows = await sqlwrapper.createTournament(
        c,
        req.headers.id,
        req.body.tournamentName,
        req.body.description,
        req.body.teamEvent,
        req.body.location,
        req.body.scoringType,
        req.body.tournamentType,
        req.body.entryCost,
        req.body.maxParticipants,
        req.body.startDate,
        req.body.endDate
      );
      res.status(200);
      res.json({ tournamentId: rows.insertId });
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
