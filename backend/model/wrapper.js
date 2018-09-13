"use strict";

const bcrypt = require("bcrypt");
const saltRounds = 10;

function createUser(connection, uname, email, password, admin) {
  const query =
    "INSERT INTO users(email, password, userName, admin) VALUES(?, ?, ?, ?)";
  return new Promise(async (resolve, reject) => {
    const hash = await bcrypt.hash(password, saltRounds);
    connection.query(query, [email, hash, uname, admin], function(
      err,
      rows,
      fields
    ) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function userExists(connection, email) {
  const query = "SELECT userName FROM users WHERE email = ?;";
  return new Promise((resolve, reject) => {
    connection.query(query, [email], function(err, rows, fields) {
      if (err) {
        reject(err);
      } else {
        resolve(rows.length > 0);
      }
    });
  });
}

function checkCredentials(connection, email, password) {
  const query = "SELECT password FROM users WHERE email = ?;";
  return new Promise((resolve, reject) => {
    connection.query(query, [email], function(err, rows, fields) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  }).then(function(rows) {
    if (rows.length > 0) {
      return bcrypt.compare(password, rows[0].password);
    } else {
      return false;
    }
  });
}

function executeSQL(connection, sql, varList) {
  return new Promise((resolve, reject) => {
    connection.query(sql, varList, function(err, rows, fields) {
      if (err) {
        reject(err);
      } else {
        resolve(rows, fields);
      }
    });
  });
}

module.exports = {
  checkCredentials: checkCredentials,
  createUser: createUser,
  userExists: userExists,
  executeSQL: executeSQL
};
