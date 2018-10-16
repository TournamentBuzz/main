"use strict";

const bcrypt = require("bcrypt");
const saltRounds = 10;

function createUser(connection, uname, email, password) {
  const query = "INSERT INTO users(email, password, userName) VALUES(?, ?, ?)";
  return new Promise(async (resolve, reject) => {
    const hash = await bcrypt.hash(password, saltRounds);
    connection.query(query, [email, hash, uname], function(err, rows, fields) {
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

function updateUser(connection, email, fieldName, fieldValue) {
  const query = "UPDATE matches SET ? = ? WHERE email = ?;";
  return new Promise((resolve, reject) => {
    connection.query(query, [fieldName, fieldValue, email], function(
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

function createTournament(
  connection,
  creator,
  tournamentName = null,
  description = null,
  maxTeamSize = 1,
  location = null,
  scoringType = "Points",
  tournamentType = "Single Elim",
  entryCost = 0,
  maxTeams = 16,
  startDate = null,
  endDate = null
) {
  const query =
    "INSERT INTO tournaments(creator, description, maxTeamSize, location, scoringType, tournamentName, tournamentType, entryCost, maxTeams, startDate, endDate) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  return new Promise((resolve, reject) => {
    connection.query(
      query,
      [
        creator,
        description,
        maxTeamSize,
        location,
        scoringType,
        tournamentName,
        tournamentType,
        entryCost,
        maxTeams,
        startDate,
        endDate
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

function getTournament(connection, id) {
  const query = "SELECT * FROM tournaments WHERE id = ?;";
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

function getTournaments(connection) {
  const query = "SELECT * FROM tournaments ORDER BY startDate DESC;";
  return new Promise((resolve, reject) => {
    connection.query(query, function(err, rows, fields) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function updateTournament(
  connection,
  id,
  creator,
  description,
  maxTeamSize,
  location,
  scoringType,
  tournamentName,
  tournamentType,
  entryCost,
  maxTeams,
  startDate,
  endDate
) {
  const query =
    "UPDATE tournaments SET creator = ?, description = ?, maxTeamSize = ?, location = ?, scoringType = ?, tournamentName = ?, tournamentType = ?, entryCost = ?, maxTeams = ?, startDate = ?, endDate = ? WHERE id = ?;";
  return new Promise((resolve, reject) => {
    connection.query(
      query,
      [
        creator,
        description,
        maxTeamSize,
        location,
        scoringType,
        tournamentName,
        tournamentType,
        entryCost,
        maxTeams,
        startDate,
        endDate,
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

function updateTournamentField(connection, id, fieldName, fieldValue) {
  const query = "UPDATE tournaments SET ? = ? WHERE id = ?;";
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

function deleteTournament(connection, id) {
  const query = "DELETE FROM tournaments WHERE id = ?;";
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

function createMatch(
  connection,
  location = null,
  score = null,
  matchTime = null,
  matchName = null,
  tournament,
  teamA = -1,
  teamB = -1
) {
  const query =
    "INSERT INTO matches(location, score, matchTime, matchName, tournament, teamA, teamB) VALUES(?, ?, ?, ?, ?, ?, ?)";
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
  teamA = -1,
  teamB = -1
) {
  const query =
    "UPDATE matches SET location = ?, score = ?, matchTime = ?, matchName = ?, tournament = ?, teamA = ?, teamB = ? WHERE id = ?;";
  return new Promise((resolve, reject) => {
    connection.query(
      query,
      [location, score, matchTime, matchName, tournament, id, teamA, teamB],
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

function searchTournament(connection, searchQuery) {
  const searchTerm = "%" + searchQuery + "%";
  const query = "SELECT * FROM tournaments WHERE tournamentName like ?;";
  return new Promise((resolve, reject) => {
    connection.query(query, [searchTerm], function(err, rows, fields) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = {
  checkCredentials: checkCredentials,
  createUser: createUser,
  userExists: userExists,
  updateUser: updateUser,
  executeSQL: executeSQL,
  createTournament: createTournament,
  getTournament: getTournament,
  getTournaments: getTournaments,
  updateTournament: updateTournament,
  updateTournamentField: updateTournamentField,
  deleteTournament: deleteTournament,
  createMatch: createMatch,
  getMatch: getMatch,
  updateMatch: updateMatch,
  updateMatchField: updateMatchField,
  deleteMatch: deleteMatch,
  searchTournament: searchTournament
};
