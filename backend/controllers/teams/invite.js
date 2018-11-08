"use strict";

const express = require("express");
const sqlwrapper = require("../../model/wrapper");
const router = express.Router();

router.post("", async (req, res, next) => {
  if (!req.body || !(req.body.team_id > 0) || !req.body.email) {
    const err = new Error("Malformed Request");
    err.status = 400;
    next(err);
    return;
  }
  if (req.headers.id !== null) {
    try {
      const c = req.app.get("databaseConnection");
      const results = await sqlwrapper.createTeamMember(
        c,
        req.body.email,
        req.body.team_id,
        true,
        false,
        true
      );
      if (results.insertId > 0) {
        res.status(200);
        res.json({ inviteStatus: true });
      } else {
        const err = new Error("Something went wrong, member not created!");
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
