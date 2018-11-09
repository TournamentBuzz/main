"use strict";

const express = require("express");
const router = express.Router();
const connection = require("../model/connect");

const accept = require("./invites/accept");
const decline = require("./invites/decline");

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
    c.destroy();
  } catch (err) {
    next(err);
  }
});

router.use("/accept", requireAuth, accept);
router.use("/decline", requireAuth, decline);

module.exports = router;
