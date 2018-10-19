"use strict";

const express = require("express");
const router = express.Router();

const sqlwrapper = require("../../model/wrapper");
const connection = require("../../model/connect");

const matches = require("./id/matches");

const requireAuth = require("../middleware/auth/verify");

router.get("/:id", async function(req, res, next) {
  try {
    const c = connection.connect(
      req.app.get("databaseConfig").host,
      req.app.get("databaseConfig").username,
      req.app.get("databaseConfig").password,
      req.app.get("databaseConfig").schema
    );
    const tournamentObject = await sqlwrapper.getTournament(c, req.param("id"));
    if (!tournamentObject[0]) {
      const err = new Error("Tournament does not exist!");
      err.status = 404;
      next(err);
      return;
    }
    res.status(200);
    res.json({ tournament: tournamentObject });
  } catch (err) {
    next(err);
  }
});

router.use("/:id", function(req, res, next) {
  req.routeParams = req.params;
  next();
});

router.use("/:id/matches", requireAuth, matches);

module.exports = router;
