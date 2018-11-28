import * as errors from "./errors";
import Authentication from "./Authentication";

export default class RefereeAPI {
  static async getReferees(tournamentId) {
    const res = await fetch(`/tournaments/id/${tournamentId}/referees`, {
      method: "GET",
      headers: Authentication.withoutJWT()
    });
    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.referees;
  }

  static async addReferee(tournamentId, email) {
    if (!Authentication.loggedIn()) return;
    const res = await fetch(`/tournaments/id/${tournamentId}/referees/add`, {
      method: "POST",
      headers: Authentication.withJWT(),
      body: JSON.stringify({ email })
    });
    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.addSuccess;
  }

  static async removeReferee(tournamentId, email) {
    if (!Authentication.loggedIn()) return;
    const res = await fetch(`/tournaments/id/${tournamentId}/referees/remove`, {
      method: "POST",
      headers: Authentication.withJWT(),
      body: JSON.stringify({ email })
    });
    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.removeSuccess;
  }
}
