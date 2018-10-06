import * as errors from "./errors";
import Authentication from "./Authentication";

export const ScoringTypes = {
  POINTS: "points",
  SETS: "sets",
  ETC: "etc" // ?
};

export const TournamentTypes = {
  SINGLE_ELIM: "single elim",
  DOUBLE_ELIM: "double elim",
  ROUND_ROBIN: "round-robin",
  ETC: "etc" // ?
};

export default class TournamentAPI {
  static async createTournament(
    tournamentName,
    description,
    teamEvent,
    location,
    scoringType,
    tournamentType,
    entryCost,
    maxParticipants,
    startDate,
    endDate
  ) {
    if (!Authentication.loggedIn()) return;
    const res = await fetch("/tournaments/create", {
      method: "POST",
      headers: Authentication.withJWT(),
      body: JSON.stringify({
        tournamentName,
        description,
        teamEvent,
        location,
        scoringType,
        tournamentType,
        entryCost,
        maxParticipants,
        startDate,
        endDate
      })
    });

    if (res.ok) {
      const json = await res.json();
      return json.tournamentId;
    } else {
      throw new errors.UnexpectedError();
    }
  }

  static async editTournament(
    tournamentId,
    tournamentName,
    description,
    teamEvent,
    location,
    scoringType,
    tournamentType,
    entryCost,
    maxParticipants,
    startDate,
    endDate
  ) {
    if (!Authentication.loggedIn()) return;
    const res = await fetch("/tournaments/edit", {
      method: "POST",
      headers: Authentication.withJWT(),
      body: JSON.stringify({
        tournamentId,
        tournamentName,
        description,
        teamEvent,
        location,
        scoringType,
        tournamentType,
        entryCost,
        maxParticipants,
        startDate,
        endDate
      })
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.tournamentId;
  }

  static async deleteTournament(tournamentId) {
    if (!Authentication.loggedIn()) return;
    const res = await fetch("/tournaments/delete", {
      method: "POST",
      headers: Authentication.withJWT(),
      body: JSON.stringify({ tournamentId })
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.deleteStatus;
  }

  static async getTournaments() {
    const res = await fetch("/tournaments", {
      method: "GET",
      headers: Authentication.withoutJWT()
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.tournaments;
  }

  static async getTournament(id) {
    const res = await fetch(`/tournaments/id/${id}`, {
      method: "GET",
      headers: Authentication.withoutJWT()
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.tournament;
  }

  static async searchTournaments(search, filter = {}) {
    if (!Authentication.loggedIn()) return;
    const res = await fetch("/tournaments/search", {
      method: "POST",
      headers: Authentication.withJWT(),
      body: JSON.stringify({ search, filter })
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.tournamentId;
  }

  static async getMatches(tournamentID) {
    if (!Authentication.loggedIn()) return;
    const res = await fetch(`/tournaments/id/${tournamentID}/matches/`, {
      method: "GET",
      headers: Authentication.withJWT()
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.tournaments;
  }

  static async createMatch(
    tournamentId,
    location,
    details,
    time,
    partyA,
    partyB
  ) {
    if (!Authentication.loggedIn()) return;
    const res = await fetch(`/tournaments/id/${tournamentId}/matches/create`, {
      method: "POST",
      headers: Authentication.withJWT(),
      body: JSON.stringify({
        tournamentId,
        location,
        details,
        time,
        partyA,
        partyB
      })
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    return res.json();
  }

  static async editMatch(
    tournamentId,
    matchId,
    location,
    details,
    time,
    partyA,
    partyB
  ) {
    if (!Authentication.loggedIn()) return;
    const res = await fetch(`/tournaments/id/${tournamentId}/matches/edit`, {
      method: "POST",
      headers: Authentication.withJWT(),
      body: JSON.stringify({
        tournamentId,
        matchId,
        location,
        details,
        time,
        partyA,
        partyB
      })
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    return res.json();
  }

  static async deleteMatch(tournamentId, matchId) {
    if (!Authentication.loggedIn()) return;
    const res = await fetch(`/tournaments/id/${tournamentId}/matches/delete`, {
      method: "POST",
      headers: Authentication.withJWT(),
      body: JSON.stringify({ tournamentId, matchId })
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.deleteStatus;
  }

  static async publishMatch(tournamentId, matchId, publish) {
    if (!Authentication.loggedIn()) return;
    const res = await fetch(`/tournaments/id/${tournamentId}/matches/publish`, {
      method: "POST",
      headers: Authentication.withJWT(),
      body: JSON.stringify({ tournamentId, matchId, publish })
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.publishStatus;
  }
}
