"use strict";

const express = require("express");
//const favicon = require('serve-favicon');

const config = require("./config");
const connection = require("./model/connect");
const user = require("./controllers/user");
const tournaments = require("./controllers/tournaments");
const matches = require("./controllers/matches");
const teams = require("./controllers/teams");
const invites = require("./controllers/invites");

// logging
const logger = require("morgan");
const log4js = require("log4js").getLogger();
if (config.serverConfig.env === "development") {
  log4js.level = "debug";
}

const app = express();

// set server config
app.set("serverConfig", config.serverConfig);
// set authentication config
app.set("authConfig", config.authConfig);
// set database config
app.set("databaseConfig", config.databaseConfig);
// Initiate database connection
const c = connection.connect(
  app.get("databaseConfig").host,
  app.get("databaseConfig").username,
  app.get("databaseConfig").password,
  app.get("databaseConfig").schema
);
app.set("databaseConnection", c);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (app.get("serverConfig").env === "development") {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
}

app.use("/user", user);
app.use("/tournaments", tournaments);
app.use("/matches", matches);
app.use("/teams", teams);
app.use("/invites", invites);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error =
    req.app.get("serverConfig").env === "development" ? err : {};

  // send back error
  err.status = err.status || 500;

  // don't leak error if not in development
  if (req.app.get("serverConfig").env !== "development" && err.status === 500) {
    err.message = "Internal Server Error";
  } else if (err.status < 500) {
    log4js.warn(err.message);
  } else {
    log4js.error(err);
  }
  res.status(err.status);
  res.json({ status: err.status, message: err.message });
});

if (app.get("env") === "development") {
  app.locals.pretty = true;
}

module.exports = app;
