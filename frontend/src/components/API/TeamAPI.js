import * as errors from "./errors";
import Authentication from "./Authentication";

export default class TeamAPI {
  createTeam(tournamentId, teamName) {
    if (!Authentication.loggedIn()) return;
    const res = await fetch(`/tournaments/id/${tournamentId}/teams/create`, {
      method: "POST",
      headers: Authentication.withJWT(),
      body: JSON.stringify({ teamName })
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.teamId;
  }

  static async editTeam(tournamentId, teamId, teamName) {
    if (!Authentication.loggedIn()) return;
    const res = await fetch(`/tournaments/id/${tournamentId}/teams/edit`, {
      method: "POST",
      headers: Authentication.withJWT(),
      body: JSON.stringify({ teamId, teamName })
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.teamId;
  }

  static async deleteTeam(tournamentId, teamId) {
    if (!Authentication.loggedIn()) return;
    const res = await fetch(`/tournaments/id/${tournamentId}/teams/delete`, {
      method: "POST",
      headers: Authentication.withJWT(),
      body: JSON.stringify({ teamId })
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.deleteStatus;
  }

  static async getTeams(tournamentId) {
    const res = await fetch(`/tournaments/id/${tournamentId}/teams`, {
      method: "GET",
      headers: Authentication.withoutJWT()
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.teams;
  }
}
