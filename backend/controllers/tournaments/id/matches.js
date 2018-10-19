"use strict";

const express = require("express");
const router = express.Router();
const sqlwrapper = require("../../../model/wrapper");
const connection = require("../../../model/connect");

router.get("/", async function(req, res, next) {
  try {
    const c = connection.connect(
      req.app.get("databaseConfig").host,
      req.app.get("databaseConfig").username,
      req.app.get("databaseConfig").password,
      req.app.get("databaseConfig").schema
    );
    const tournamentObject = await sqlwrapper.getTournament(
      c,
      req.routeParams.id
    );
    if (req.headers.id !== null) {
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
