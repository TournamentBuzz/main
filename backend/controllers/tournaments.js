"use strict";

const express = require("express");
const router = express.Router();
const sqlwrapper = require("../model/wrapper");
const connection = require("../model/connect");

const create = require("./tournaments/create");
const edit = require("./tournaments/edit");
const deletejs = require("./tournaments/delete");
const id = require("./tournaments/id");
const search = require("./tournaments/search");

const requireAuth = require("../middleware/auth/verify");

router.get("/", async function(req, res, next) {
  try {
    const c = connection.connect(
      req.app.get("databaseConfig").host,
      req.app.get("databaseConfig").username,
      req.app.get("databaseConfig").password,
      req.app.get("databaseConfig").schema
    );
    const results = await sqlwrapper.getTournaments(c);
    res.status(200);
    res.json({ tournaments: results });
  } catch (err) {
    next(err);
  }
});

router.use("/create", requireAuth, create);
router.use("/edit", requireAuth, edit);
router.use("/delete", requireAuth, deletejs);
router.use("/id", id);
router.use("/search", search);

module.exports = router;