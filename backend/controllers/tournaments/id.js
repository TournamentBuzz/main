"use strict";

const express = require("express");
const router = express.Router();

const sqlwrapper = require("../../model/wrapper");
const connection = require("../../model/connect");

router.get("/:id", async function(req, res, next) {
  try {
    const c = connection.connect(
      req.app.get("databaseConfig").host,
      req.app.get("databaseConfig").username,
      req.app.get("databaseConfig").password,
      req.app.get("databaseConfig").schema
    );
    const tournamentObject = await sqlwrapper.getTournament(c, req.param("id"));
    console.log(tournamentObject);
    res.status(200);
    res.json({ tournament: tournamentObject });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
