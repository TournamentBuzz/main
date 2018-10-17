"use strict";

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
  createTournament: createTournament,
  getTournament: getTournament,
  getTournaments: getTournaments,
  updateTournament: updateTournament,
  updateTournamentField: updateTournamentField,
  deleteTournament: deleteTournament,
  searchTournament: searchTournament
};