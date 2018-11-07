"use strict";

const express = require("express");
const router = express.Router();
const sqlwrapper = require("../../../model/wrapper");

router.get("/", async function(req, res, next) {
  try {
    const c = req.app.get("databaseConnection");
    const tournamentObject = await sqlwrapper.getTournament(
      c,
      req.routeParams.id
    );
    if (req.headers.id === tournamentObject[0].creator) {
      const results = await sqlwrapper.getMatches(c, req.routeParams.id);
      res.status(200);
      res.json({ matches: results });
    } else {
      const results = await sqlwrapper.getPublishedMatches(
        c,
        req.routeParams.id
      );
      res.status(200);
      res.json({ matches: results });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
