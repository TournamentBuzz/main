"use strict";

const express = require("express");
const router = express.Router();
const sqlwrapper = require("../../../model/wrapper");

router.post("/", async function(req, res, next) {
  try {
    const c = req.app.get("databaseConnection");
    const tournamentObject = await sqlwrapper.getTournament(
      c,
      req.headers.tournamentid
    );
    if (!tournamentObject[0]) {
      const err = new Error("Tournament does not exist!");
      err.status = 404;
      next(err);
      return;
    }
    if (req.headers.id === tournamentObject[0].creator) {
      const validTeams = sqlwrapper.getTeamsWithTeamMembers(
        c,
        tournamentObject[0].id,
        tournamentObject[0].maxTeamSize
      );
      if (tournamentObject[0].tournamentType === "Single Elim") {
        await generateSingleElimBracket(validTeams);
        res.status(200);
        res.json({ generationSuccess: true });
      } else if (tournamentObject[0].tournamentType === "Double Elim") {
        const err = new Error("Bracket type does not exist!");
        err.status = 400;
        next(err);
      } else if (tournamentObject[0].tournamentType === "Round-robin") {
        const err = new Error("Bracket type does not exist!");
        err.status = 400;
        next(err);
      } else {
        const err = new Error("Bracket type does not exist!");
        err.status = 400;
        next(err);
      }
    } else {
      const err = new Error("You cannot generate matches for this tournament!");
      err.status = 401;
      next(err);
    }
  } catch (err) {
    next(err);
  }
});

async function generateSingleElimBracket(c, teams, tournamentId) {
  const teamsCopy = teams.slice(0);
  while (!isPowerOfTwo(teamsCopy.length)) {
    teamsCopy.push(null);
  }
  let currentMatchups = await generateMatchLayerFromTeams(
    c,
    teams,
    tournamentId
  );
  while (currentMatchups.length !== 1) {
    currentMatchups = await generateMatchLayer(
      c,
      currentMatchups,
      tournamentId
    );
  }
}

async function generateMatchLayer(connection, matches, tournamentId) {
  const nextLayer = [];
  for (let x = 0; x < Math.floor(matches.length / 2); x++) {
    const match = {
      id: null,
      location: null,
      winner: null,
      matchTime: null,
      matchName: null,
      tournament: tournamentId,
      teamA: null,
      teamB: null,
      feederA: null,
      feederB: null,
      scoreA: null,
      scoreB: null,
      feederAIsLoser: false,
      feederBIsLoser: false
    };
    match.feederA = matches[x].id;
    match.feederB = matches[matches.length - (x + 1)].id;
    if (matches[x].winner !== 0) {
      if (matches[x].winner === 1) {
        match.teamA = matches[x].teamA;
      } else {
        match.teamA = matches[x].teamB;
      }
    }
    if (matches[matches.length - (x + 1)].winner !== 0) {
      if (matches[matches.length - (x + 1)].winner === 1) {
        match.teamB = matches[matches.length - (x + 1)].teamA;
      } else {
        match.teamB = matches[matches.length - (x + 1)].teamB;
      }
    }
    const created = await sqlwrapper.createMatch(
      connection,
      match.location,
      match.winner,
      match.matchTime,
      match.matchName,
      match.tournament,
      match.teamA,
      match.teamB,
      match.feederA,
      match.feederB,
      match.scoreA,
      match.scoreB,
      match.feederAIsLoser,
      match.feederBIsLoser
    );
    match.id = created.insertId;
    nextLayer.push(match);
  }
  return nextLayer;
}

async function generateMatchLayerFromTeams(connection, teams, tournamentId) {
  const matches = [];
  for (let x = 0; x < Math.floor(teams.length / 2); x++) {
    const match = {
      id: null,
      location: null,
      winner: null,
      matchTime: null,
      matchName: null,
      tournament: tournamentId,
      teamA: null,
      teamB: null,
      feederA: null,
      feederB: null,
      scoreA: null,
      scoreB: null,
      feederAIsLoser: false,
      feederBIsLoser: false
    };
    match.teamA = teams[x].id;
    match.teamB = teams[teams.length - (x + 1)].id;
    if (match.teamB === null) {
      // Set the winner to the first team
      match.winner = 1;
    }
    const created = await sqlwrapper.createMatch(
      connection,
      match.location,
      match.winner,
      match.matchTime,
      match.matchName,
      match.tournament,
      match.teamA,
      match.teamB,
      match.feederA,
      match.feederB,
      match.scoreA,
      match.scoreB,
      match.feederAIsLoser,
      match.feederBIsLoser
    );
    match.id = created.insertId;
    matches.push(match);
  }
  return matches;
}

function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}

module.exports = router;
