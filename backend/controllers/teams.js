"use strict";

const express = require("express");
const router = express.Router();
const connection = require("../model/connect");

const promote = require("./teams/promote");
const remove = require("./teams/remove");
const invite = require("./teams/invite");

const requireAuth = require("../middleware/auth/verify");

router.get("/", function(req, res, next) {
  try {
    const c = connection.connect(
      req.app.get("databaseConfig").host,
      req.app.get("databaseConfig").username,
      req.app.get("databaseConfig").password,
      req.app.get("databaseConfig").schema
    );
    if (c === null) {
      throw new Error("No database connection");
    }
  } catch (err) {
    next(err);
  }
});

router.use("/promote", requireAuth, promote);
router.use("/remove", requireAuth, remove);
router.use("/invite", requireAuth, invite);

module.exports = router;
