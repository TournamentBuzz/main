"use strict";

const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  try {
    const payload = jwt.verify(
      retrieveToken(req),
      req.app.get("authConfig").authKey
    );
    req.headers.id = payload.id;
  } catch (e) {
    e.status = 401;
    next(e);
  }
  next();
}

function retrieveToken(req) {
  if (!req.headers.authorization) {
    return null;
  }
  const auth = req.headers.authorization.split(" ");
  if (auth[0] === "Bearer" && auth[1]) {
    return auth[1];
  }
  return null;
}

module.exports = verifyToken;
