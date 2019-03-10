"use strict";

const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const { OAuth2Client } = require("google-auth-library");

router.post("/", async (req, res, next) => {
  if (req.body.gToken) {
    const clientIds = JSON.parse(req.app.get("authConfig").googleAuthClientId);
    const client = new OAuth2Client(clientIds);
    try {
      const verifyToken = await client.verifyIdToken({
        idToken: req.body.gToken,
        audience: clientIds
      });
      if (verifyToken) {
        if (clientIds.includes(verifyToken["aud"])) {
          const token = jwt.sign(
            {
              id: verifyToken["email"]
            },
            req.app.get("authConfig").authKey,
            { expiresIn: req.app.get("authConfig").expiresIn }
          );
          res.status(200);
          res.json({ jwt: token });
        } else {
          const err = new Error("Invalid client id");
          err.status = 401;
          next(err);
        }
      }
    } catch (err) {
      err.status = 401;
      next(err);
    }
  } else {
    const err = new Error("Malformed Request");
    err.status = 400;
    next(err);
    return;
  }
});

module.exports = router;
