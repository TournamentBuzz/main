"use strict";

const mysql = require("mysql");
const logger = require("log4js").getLogger();

function connect(host, username, password, database, app) {
  const connection = mysql.createConnection({
    host: host,
    user: username,
    password: password,
    database: database,
    timezone: "utc"
  });
  connection.connect(err => {
    if (err) {
      logger.error(err);
      logger.warn("Retrying connection to MySQL database...");
      setTimeout(
        connectionCallbackWrapper(host, username, password, database, app),
        2000
      );
    }
  });
  connection.on("error", err => {
    logger.error(err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      logger.error(err);
      logger.warn("Retrying connection to MySQL database...");
      setTimeout(
        connectionCallbackWrapper(host, username, password, database, app),
        2000
      );
    } else {
      throw err;
    }
  });
  app.set("databaseConnection", connection);
  logger.info("Connected to MySQL database!");
}

function connectionCallbackWrapper(host, username, password, database, app) {
  return () => {
    connect(
      host,
      username,
      password,
      database,
      app
    );
  };
}

module.exports = {
  connect: connect
};
