"use strict";

const mysql = require("mysql");

function connect(host, username, password, database) {
  const connection = mysql.createConnection({
    host: host,
    user: username,
    password: password,
    database: database,
    timezone: "utc"
  });
  connection.connect();
  return connection;
}

module.exports = {
  connect: connect
};
