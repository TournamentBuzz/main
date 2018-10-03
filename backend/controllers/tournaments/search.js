"use strict";

const express = require("express");
const sqlwrapper = require("../../model/wrapper");
const connection = require("../../model/connect");
const router = express.Router();

router.post("/", async (req, res, next) => {
  if (!req.body || !req.body.search) {
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
    const results = await sqlwrapper.searchTournament(c, req.body.search);
    res.status(200);
    res.json({ tournaments: results });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
