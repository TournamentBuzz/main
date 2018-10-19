"use strict";

const express = require("express");
const router = express.Router();
const connection = require("../../../model/connect");

const create = require("./teams/create");
const withdraw = require("./teams/withdraw");

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

router.use("/create", requireAuth, create);
router.use("/withdraw", requireAuth, withdraw);

module.exports = router;
