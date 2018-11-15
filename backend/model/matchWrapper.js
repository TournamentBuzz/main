"use strict";

function createMatch(
  connection,
  location = null,
  score = null,
  winner = null,
  matchTime = null,
  matchName = null,
  tournament,
  teamA = null,
  teamB = null
) {
  const query =
    "INSERT INTO matches(location, score, winner, matchTime, matchName, tournament, teamA, teamB) VALUES(?, ?, ?, ?, ?, ?, ?, ?);";
  return new Promise((resolve, reject) => {
    connection.query(
      query,
      [location, score, winner, matchTime, matchName, tournament, teamA, teamB],
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
  const query =
    "SELECT m.*, t.teamName AS 'teamAName', t1.teamName AS 'teamBName' FROM matches m LEFT JOIN teams t1 ON m.teamB = t1.id LEFT JOIN teams t ON m.teamA = t.id WHERE teams.id = ?;";
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

function getPublishedMatch(connection, id) {
  const query =
    "SELECT m.*, t.teamName AS 'teamAName', t1.teamName AS 'teamBName' FROM matches m LEFT JOIN teams t1 ON m.teamB = t1.id LEFT JOIN teams t ON m.teamA = t.id WHERE teams.id = ? AND publish = 1;";
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
  winner,
  matchTime,
  matchName,
  teamA,
  teamB
) {
  const query =
    "UPDATE matches SET location = ?, score = ?, winner = ?, matchTime = ?, matchName = ?, teamA = ?, teamB = ? WHERE id = ?;";
  return new Promise((resolve, reject) => {
    connection.query(
      query,
      [location, score, winner, matchTime, matchName, teamA, teamB, id],
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
  const query = "UPDATE matches SET ?? = ? WHERE id = ?;";
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
    "SELECT m.*, t.teamName AS 'teamAName', t1.teamName AS 'teamBName' FROM matches m LEFT JOIN teams t1 ON m.teamB = t1.id LEFT JOIN teams t ON m.teamA = t.id WHERE m.tournament = ? ORDER BY matchTime ASC;";
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
    "SELECT m.*, t.teamName AS 'teamAName', t1.teamName AS 'teamBName' FROM matches m LEFT JOIN teams t1 ON m.teamB = t1.id LEFT JOIN teams t ON m.teamA = t.id WHERE m.tournament = ? AND publish = 1 ORDER BY matchTime ASC;";
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
  getPublishedMatch: getPublishedMatch,
  updateMatch: updateMatch,
  updateMatchField: updateMatchField,
  deleteMatch: deleteMatch,
  getMatches: getMatches,
  getPublishedMatches: getPublishedMatches
};
