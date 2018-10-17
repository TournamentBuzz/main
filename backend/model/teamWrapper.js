"use strict";

function createTeam(
  connection,
  teamName = null,
  leader,
  tournament,
  seed = null
) {
  const query =
    "INSERT INTO teams(teamName, leader, tournament, seed) VALUES(?, ?, ?, ?)";
  return new Promise((resolve, reject) => {
    connection.query(query, [teamName, leader, tournament, seed], function(
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

function getTeam(connection, id) {
  const query = "SELECT * FROM teams WHERE id = ?;";
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

function updateTeam(connection, id, teamName, leader, tournament, seed) {
  const query =
    "UPDATE teams SET teamName = ?, leader = ?, tournament = ?, seed = ? WHERE id = ?;";
  return new Promise((resolve, reject) => {
    connection.query(query, [teamName, leader, tournament, seed, id], function(
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

function updateTeamField(connection, id, fieldName, fieldValue) {
  const query = "UPDATE teams SET ? = ? WHERE id = ?;";
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

function deleteTeam(connection, id) {
  const query = "DELETE FROM teams WHERE id = ?;";
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

function createTeamMember(
  connection,
  userEmail,
  teamId,
  invited = false,
  requested = false,
  approved = false
) {
  const query =
    "INSERT INTO teamMembers(userEmail, teamId, invited, requested, approved) VALUES(?, ?, ?, ?, ?)";
  return new Promise((resolve, reject) => {
    connection.query(
      query,
      [userEmail, teamId, invited, requested, approved],
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

function updateTeamMember(
  connection,
  userEmail,
  teamId,
  invited,
  requested,
  approved
) {
  const query =
    "UPDATE teamMembers SET invited = ?, requested = ?, approved = ? WHERE id = userEmail = ? AND teamId = ?;";
  return new Promise((resolve, reject) => {
    connection.query(
      query,
      [invited, requested, approved, userEmail, teamId],
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

function deleteTeamMember(connection, userEmail, teamId) {
  const query = "DELETE FROM teamMembers WHERE userEmail = ? AND teamId = ?;";
  return new Promise((resolve, reject) => {
    connection.query(query, [userEmail, teamId], function(err, rows, fields) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function getTeamMembers(connection, teamId) {
  const query = "SELECT * FROM teamMembers WHERE teamId = ?;";
  return new Promise((resolve, reject) => {
    connection.query(query, [teamId], function(err, rows, fields) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = {
  createTeam: createTeam,
  getTeam: getTeam,
  updateTeam: updateTeam,
  updateTeamField: updateTeamField,
  deleteTeam: deleteTeam,
  createTeamMember: createTeamMember,
  updateTeamMember: updateTeamMember,
  deleteTeamMember: deleteTeamMember,
  getTeamMembers: getTeamMembers
};
