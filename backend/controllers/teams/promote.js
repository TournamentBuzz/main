"use strict";

const express = require("express");
const sqlwrapper = require("../../model/wrapper");
const connection = require("../../model/connect");
const router = express.Router();

router.post("", async (req, res, next) => {
  if (!req.body || !(req.body.team_id > 0) || !req.body.email_to_promote) {
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
      const results = await sqlwrapper.updateTeamField(
        c,
        req.body.team_id,
        "leader",
        req.body.email_to_promote
      );
      if (results.affectedRows > 0) {
        res.status(200);
        res.json({ promoteStatus: true });
      } else {
        const err = new Error("Something went wrong, leader not updated!");
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
