"use strict";

function createMatch(
  connection,
  location = null,
  winner = null,
  matchTime = null,
  matchName = null,
  tournament,
  teamA = null,
  teamB = null,
  feederA = null,
  feederB = null,
  scoreA = null,
  scoreB = null,
  feederAIsLoser = false,
  feederBIsLoser = false
) {
  const query =
    "INSERT INTO matches(location, winner, matchTime, matchName, tournament, teamA, teamB, feederA, feederB, scoreA, scoreB, feederAIsLoser, feederBIsLoser) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
  return new Promise((resolve, reject) => {
    connection.query(
      query,
      [
        location,
        winner,
        matchTime,
        matchName,
        tournament,
        teamA,
        teamB,
        feederA,
        feederB,
        scoreA,
        scoreB,
        feederAIsLoser,
        feederBIsLoser
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

function getMatch(connection, id) {
  const query =
    "SELECT m.*, t.teamName AS 'teamAName', t1.teamName AS 'teamBName' FROM matches m LEFT JOIN teams t1 ON m.teamB = t1.id LEFT JOIN teams t ON m.teamA = t.id WHERE m.id = ?;";
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
    "SELECT m.*, t.teamName AS 'teamAName', t1.teamName AS 'teamBName' FROM matches m LEFT JOIN teams t1 ON m.teamB = t1.id LEFT JOIN teams t ON m.teamA = t.id WHERE m.id = ? AND publish = 1;";
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
  winner,
  matchTime,
  matchName,
  teamA,
  teamB,
  feederA,
  feederB,
  scoreA,
  scoreB,
  feederAIsLoser = false,
  feederBIsLoser = false
) {
  const query =
    "UPDATE matches SET location = ?, winner = ?, matchTime = ?, matchName = ?, teamA = ?, teamB = ?, feederA = ?, feederB = ?, scoreA = ?, scoreB = ?, feederAIsLoser = ?, feederBIsLoser = ? WHERE id = ?;";
  return new Promise((resolve, reject) => {
    connection.query(
      query,
      [
        location,
        winner,
        matchTime,
        matchName,
        teamA,
        teamB,
        feederA,
        feederB,
        scoreA,
        scoreB,
        feederAIsLoser,
        feederBIsLoser,
        id
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

function getDependentMatches(connection, matchId) {
  const query = "SELECT * FROM matches WHERE feederA = ? OR feederB = ?;";
  return new Promise((resolve, reject) => {
    connection.query(query, [matchId, matchId], function(err, rows, fields) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

async function reloadMatches(connection, matchId) {
  const matches = await getDependentMatches(connection, matchId);
  const updatedMatch = await getMatch(connection, matchId);
  let winner = updatedMatch[0].teamA;
  let loser = updateMatch[0].teamB;
  if (updatedMatch[0].winner === 1) {
    winner = updateMatch[0].teamB;
    loser = updateMatch[0].teamA;
  }
  try {
    for (let i = 0; i < matches.length; i++) {
      if (matches[i].feederA === matchId) {
        if (matches[i].feederAIsLoser === 1) {
          updateMatchField(connection, matches[i].id, "teamA", loser);
        } else {
          updateMatchField(connection, matches[i].id, "teamA", winner);
        }
      } else {
        if (matches[i].feederBIsLoser === 1) {
          updateMatchField(connection, matches[i].id, "teamB", loser);
        } else {
          updateMatchField(connection, matches[i].id, "teamB", winner);
        }
      }
    }
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = {
  createMatch: createMatch,
  getMatch: getMatch,
  getPublishedMatch: getPublishedMatch,
  updateMatch: updateMatch,
  updateMatchField: updateMatchField,
  deleteMatch: deleteMatch,
  getMatches: getMatches,
  getPublishedMatches: getPublishedMatches,
  getDependentMatches: getDependentMatches,
  reloadMatches: reloadMatches
};
