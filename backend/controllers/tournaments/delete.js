"use strict";

const express = require("express");
const sqlwrapper = require("../../model/wrapper");
const connection = require("../../model/connect");
const requireAuth = require("../../middleware/auth/verify");
const router = express.Router();

router.post("", async (req, res, next) => {
  if (!req.body || !req.body.id) {
    const err = new Error("Malformed Request");
    err.status = 400;
    next(err);
    return;
  }

  const validCredentials = await requireAuth.verifyToken(req, res, next);
  if (validCredentials) {
    try {
      const c = connection.connect(
        req.app.get("databaseConfig").host,
        req.app.get("databaseConfig").username,
        req.app.get("databaseConfig").password,
        req.app.get("databaseConfig").schema
      );
      await sqlwrapper.deleteTournament(c, req.body.id);
      res.status(200);
      res.json({ deleteStatus: "success" });
    } catch (err) {
      next(err);
    }
  } else {
    const err = new Error("Invalid Credentials");
    err.status = 401;
    next(err);
  }
});

module.exports = router;
