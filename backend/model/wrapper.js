"use strict";

const matchWrapper = require("./matchWrapper");
const userWrapper = require("./userWrapper");
const tournamentWrapper = require("./tournamentWrapper");
const teamWrapper = require("./teamWrapper");

function createUser(connection, uname, email, password) {
  return userWrapper.createUser(connection, uname, email, password);
}

function userExists(connection, email) {
  return userWrapper.userExists(connection, email);
}

function updateUser(connection, email, fieldName, fieldValue) {
  return userWrapper.updateUser(connection, email, fieldName, fieldValue);
}

function checkCredentials(connection, email, password) {
  return userWrapper.checkCredentials(connection, email, password);
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
  return tournamentWrapper.createTournament(
    connection,
    creator,
    tournamentName,
    description,
    maxTeamSize,
    location,
    scoringType,
    tournamentType,
    entryCost,
    maxTeams,
    startDate,
    endDate
  );
}

function getTournament(connection, id) {
  return tournamentWrapper.getTournament(connection, id);
}

function getTournaments(connection) {
  return tournamentWrapper.getTournaments(connection);
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
  return tournamentWrapper.updateTournament(
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
  );
}

function updateTournamentField(connection, id, fieldName, fieldValue) {
  return tournamentWrapper.updateTournamentField(
    connection,
    id,
    fieldName,
    fieldValue
  );
}

function deleteTournament(connection, id) {
  return tournamentWrapper.deleteTournament(connection, id);
}

function searchTournament(connection, searchQuery) {
  return tournamentWrapper.searchTournament(connection, searchQuery);
}

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
  return matchWrapper.createMatch(
    connection,
    location,
    score,
    matchTime,
    matchName,
    tournament,
    teamA,
    teamB
  );
}

function getMatch(connection, id) {
  return matchWrapper.getMatch(connection, id);
}

function getPublishedMatch(connection, id) {
  return matchWrapper.getPublishedMatch(connection, id);
}

function getMatches(connection, tournamentId) {
  return matchWrapper.getMatches(connection, tournamentId);
}

function getPublishedMatches(connection, tournamentId) {
  return matchWrapper.getPublishedMatches(connection, tournamentId);
}

function updateMatch(
  connection,
  id,
  location,
  score,
  matchTime,
  matchName,
  teamA,
  teamB
) {
  return matchWrapper.updateMatch(
    connection,
    id,
    location,
    score,
    matchTime,
    matchName,
    teamA,
    teamB
  );
}

function updateMatchField(connection, id, fieldName, fieldValue) {
  return matchWrapper.updateMatchField(connection, id, fieldName, fieldValue);
}

function deleteMatch(connection, id) {
  return matchWrapper.deleteMatch(connection, id);
}

function createTeam(connection, teamName, leader, tournament, seed) {
  return teamWrapper.createTeam(connection, teamName, leader, tournament, seed);
}

function getTeam(connection, id) {
  return teamWrapper.getTeam(connection, id);
}

function getTeams(connection, tournamentId) {
  return teamWrapper.getTeams(connection, tournamentId);
}

function updateTeam(connection, id, teamName, leader, tournament, seed) {
  return teamWrapper.updateTeam(
    connection,
    id,
    teamName,
    leader,
    tournament,
    seed
  );
}

function updateTeamField(connection, id, fieldName, fieldValue) {
  return teamWrapper.updateTeamField(connection, id, fieldName, fieldValue);
}

function deleteTeam(connection, id) {
  return teamWrapper.deleteTeam(connection, id);
}

function createTeamMember(
  connection,
  userEmail,
  teamId,
  invited = false,
  requested = false,
  approved = false
) {
  return teamWrapper.createTeamMember(
    connection,
    userEmail,
    teamId,
    invited,
    requested,
    approved
  );
}

function updateTeamMember(
  connection,
  userEmail,
  teamId,
  invited,
  requested,
  approved
) {
  return teamWrapper.updateTeamMember(
    connection,
    userEmail,
    teamId,
    invited,
    requested,
    approved
  );
}

function deleteTeamMember(connection, userEmail, teamId) {
  return teamWrapper.deleteTeamMember(connection, userEmail, teamId);
}

function getTeamMember(connection, teamId, userEmail) {
  return teamWrapper.getTeamMembers(connection, teamId, userEmail);
}

function getTeamMembers(connection, teamId) {
  return teamWrapper.getTeamMembers(connection, teamId);
}

function getApprovedTeamMembers(connection, teamId) {
  return teamWrapper.getApprovedTeamMembers(connection, teamId);
}

function getTeamsWithTeamMembers(connection, tournamentId, numParticipants) {
  return teamWrapper.getTeamsWithTeamMembers(
    connection,
    tournamentId,
    numParticipants
  );
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
  getPublishedMatch: getPublishedMatch,
  getMatches: getMatches,
  getPublishedMatches: getPublishedMatches,
  updateMatch: updateMatch,
  updateMatchField: updateMatchField,
  deleteMatch: deleteMatch,
  searchTournament: searchTournament,
  createTeam: createTeam,
  getTeam: getTeam,
  getTeams: getTeams,
  updateTeam: updateTeam,
  updateTeamField: updateTeamField,
  deleteTeam: deleteTeam,
  createTeamMember: createTeamMember,
  updateTeamMember: updateTeamMember,
  deleteTeamMember: deleteTeamMember,
  getTeamMember: getTeamMember,
  getTeamMembers: getTeamMembers,
  getApprovedTeamMembers: getApprovedTeamMembers,
  getTeamsWithTeamMembers: getTeamsWithTeamMembers
};
