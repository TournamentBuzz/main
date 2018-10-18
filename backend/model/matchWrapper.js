"use strict";

function createMatch(
  connection,
  location = null,
  score = null,
  matchTime = null,
  matchName = null,
  tournament,
  teamA = null,
  teamB = null
) {
  const query =
    "INSERT INTO matches(location, score, matchTime, matchName, tournament, teamA, teamB) VALUES(?, ?, ?, ?, ?, ?, ?);";
  return new Promise((resolve, reject) => {
    connection.query(
      query,
      [location, score, matchTime, matchName, tournament, teamA, teamB],
      function(err, rows, fields) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

function getMatch(connection, id) {
  const query = "SELECT * FROM matches WHERE id = ?;";
  return new Promise((resolve, reject) => {
    connection.query(query, [id], function(err, rows, fields) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function updateMatch(
  connection,
  id,
  location,
  score,
  matchTime,
  matchName,
  tournament,
  teamA,
  teamB,
  isPublished
) {
  const query =
    "UPDATE matches SET location = ?, score = ?, matchTime = ?, matchName = ?, tournament = ?, teamA = ?, teamB = ?, isPublished = ? WHERE id = ?;";
  return new Promise((resolve, reject) => {
    connection.query(
      query,
      [
        location,
        score,
        matchTime,
        matchName,
        tournament,
        id,
        teamA,
        teamB,
        isPublished
      ],
      function(err, rows, fields) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

function updateMatchField(connection, id, fieldName, fieldValue) {
  const query = "UPDATE matches SET ? = ? WHERE id = ?;";
  return new Promise((resolve, reject) => {
    connection.query(query, [fieldName, fieldValue, id], function(
      err,
      rows,
      fields
    ) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function deleteMatch(connection, id) {
  const query = "DELETE FROM matches WHERE id = ?;";
  return new Promise((resolve, reject) => {
    connection.query(query, [id], function(err, rows, fields) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function getMatches(connection, tournamentId) {
  const query =
    "SELECT * FROM matches WHERE tournament = ? AND matchTime >= NOW() ORDER BY matchTime DESC;";
  return new Promise((resolve, reject) => {
    connection.query(query, [tournamentId], function(err, rows, fields) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function getPublishedMatches(connection, tournamentId) {
  const query =
    "SELECT * FROM matches WHERE tournament = ? AND isPublished = 1 AND matchTime >= NOW() ORDER BY matchTime DESC;";
  return new Promise((resolve, reject) => {
    connection.query(query, [tournamentId], function(err, rows, fields) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = {
  createMatch: createMatch,
  getMatch: getMatch,
  updateMatch: updateMatch,
  updateMatchField: updateMatchField,
  deleteMatch: deleteMatch,
  getMatches: getMatches,
  getPublishedMatches: getPublishedMatches
};
