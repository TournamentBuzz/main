"use strict";

const express = require("express");
const jwt = require("jsonwebtoken");
const sqlwrapper = require("../../model/wrapper");
const connection = require("../../model/connect");
const router = express.Router();

router.post("", function(req, res, next) {
  if (!req.body || !req.body.email || !req.body.password) {
    const err = new Error("Malformed Request");
    err.status = 400;
    next(err);
    return;
  }
  const c = connection.connect(
    req.app.get("databaseConfig").host,
    req.app.get("databaseConfig").username,
    req.app.get("databaseConfig").password,
    req.app.get("databaseConfig").schema
  );
  sqlwrapper
    .checkCredentials(c, req.body.email, req.body.password)
    .then(function(validCredentials) {
      if (validCredentials) {
        const token = jwt.sign(
          {
            id: req.body.email
          },
          req.app.get("authConfig").authKey,
          { expiresIn: req.app.get("authConfig").expiresIn }
        );
        res.status(200);
        res.json({ jwt: token });
      } else {
        const err = new Error("Invalid Username or Password");
        err.status = 401;
        next(err);
      }
    })
    .catch(function(err) {
      next(err);
    });
});

module.exports = router;
