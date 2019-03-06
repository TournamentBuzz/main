"use strict";

const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const { OAuth2Client } = require("google-auth-library");
const gapi = require("googleapis");

router.post("", async (req, res, next) => {
  if (req.body.gToken) {
    const client = new OAuth2Client(
      req.app.get("authConfig").googleAuthClientId
    );
    try {
      const verifyToken = await new Promise(function(resolve, reject) {
        client.verifyIdToken(
          {
            idToken: req.body.gToken,
            audience: JSON.parse(req.app.get("authConfig").googleAuthClientId)
          },
          function(e, login) {
            if (login) {
              const auth2 = gapi.auth2.init({
                client_id: client, // eslint-disable-line camelcase
                scope: "profile"
              });
              const profile = auth2.currentUser.get().getBasicProfile();
              const email = profile.getEmail();
              const payload = login.getPayload();
              const cid = payload["aud"];
              resolve((email, cid));
            } else {
              console.log(e);
              reject(e);
            }
          }
        );
      })
        .then(function(email, cid) {
          return [email, cid];
        })
        .catch(function(err) {
          throw err;
        });
      if (verifyToken) {
        if (verifyToken[1] === req.app.get("authConfig").googleAuthClientId) {
          const token = jwt.sign(
            {
              id: verifyToken[0]
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
