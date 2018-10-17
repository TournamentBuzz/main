import * as errors from "./errors";
import Authentication from "./Authentication";

export default class MatchAPI {
  static async createMatch(
    tournamentId,
    location,
    details,
    matchName,
    matchTime,
    teamA,
    teamB
  ) {
    if (!Authentication.loggedIn()) return;
    const res = await fetch(`/tournaments/id/${tournamentId}/matches/create`, {
      method: "POST",
      headers: Authentication.withJWT(),
      body: JSON.stringify({
        location,
        details,
        matchName,
        matchTime,
        teamA,
        teamB
      })
    });

    if (res.ok) {
      const json = await res.json();
      return json.matchId;
    } else {
      throw new errors.UnexpectedError();
    }
  }

  static async editMatch(
    tournamentId,
    matchId,
    location,
    details,
    matchName,
    matchTime,
    teamA,
    teamB
  ) {
    if (!Authentication.loggedIn()) return;
    const res = await fetch(`/tournaments/id/${tournamentId}/matches/edit`, {
      method: "POST",
      headers: Authentication.withJWT(),
      body: JSON.stringify({
        matchId,
        location,
        details,
        matchName,
        matchTime,
        teamA,
        teamB
      })
    });

    if (res.ok) {
      const json = await res.json();
      return json.matchId;
    } else {
      throw new errors.UnexpectedError();
    }
  }

  static async deleteMatch(tournamentId, matchId) {
    if (!Authentication.loggedIn()) return;
    const res = await fetch(`/tournaments/id/${tournamentId}/matches/delete`, {
      method: "POST",
      headers: Authentication.withJWT(),
      body: JSON.stringify({
        matchId
      })
    });

    if (res.ok) {
      const json = await res.json();
      return json.deleteStatus;
    } else {
      throw new errors.UnexpectedError();
    }
  }

  static async publishMatch(tournamentId, matchId, publish) {
    if (!Authentication.loggedIn()) return;
    const res = await fetch(`/tournaments/id/${tournamentId}/matches/publish`, {
      method: "POST",
      headers: Authentication.withJWT(),
      body: JSON.stringify({
        matchId,
        publish
      })
    });

    if (res.ok) {
      const json = await res.json();
      return json.publishStatus;
    } else {
      throw new errors.UnexpectedError();
    }
  }

  static async getMatches(tournamentID) {
    if (!Authentication.loggedIn()) return;
    const res = await fetch(`/tournaments/id/${tournamentID}/matches/`, {
      method: "GET",
      headers: Authentication.withoutJWT()
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.matches;
  }
}
