import decode from "jwt-decode";
import * as errors from "./errors";

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

export default class UserAuth {
  constructor(storage = localStorage) {
    this.storage = storage;
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.renew = this.renew.bind(this);
    this.logout = this.logout.bind(this);
  }

  async login(email, password) {
    const res = await fetch("/user/login", {
      method: "POST",
      headers: this._headers(),
      body: JSON.stringify({ email, password })
    });

    if (res.status === 401) {
      // API returned unauthorized
      throw new errors.IncorrectLoginError();
    }
    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    this.setToken(json.jwt);
  }

  async register(name, email, password) {
    const res = await fetch("/user/register", {
      method: "POST",
      headers: this._headers(),
      body: JSON.stringify({ email, password, name })
    });

    if (res.status === 409) {
      // User already registered
      throw new errors.EmailRegisteredError();
    }
    if (!res.ok) {
      // Other API error
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    this.setToken(json.jwt);
  }

  async renew() {
    if (!this.loggedIn()) return;
    const res = await fetch("/user/renew", {
      method: "GET",
      headers: this._headersWithAuth()
    });

    if (res.ok) {
      const json = await res.json();
      this.setToken(json.jwt);
    } else {
      this.logout();
    }
  }

  async createTournament(
    name,
    teamEvent,
    location,
    scoringType,
    tournamentType,
    entryCost,
    maxParticipants,
    startDate
  ) {
    if (!this.loggedIn()) return;
    const res = await fetch("/tournaments/create", {
      method: "POST",
      headers: this._headersWithAuth(),
      body: JSON.stringify({
        name,
        teamEvent,
        location,
        scoringType,
        tournamentType,
        entryCost,
        maxParticipants,
        startDate
      })
    });

    if (res.ok) {
      const json = await res.json();
      return json.tournamentId;
    } else {
      throw new errors.UnexpectedError();
    }
  }

  async editTournament(
    tournamentId,
    name,
    teamEvent,
    location,
    scoringType,
    tournamentType,
    entryCost,
    maxParticipants,
    startDate
  ) {
    if (!this.loggedIn()) return;
    const res = await fetch("/tournaments/edit", {
      method: "POST",
      headers: this._headersWithAuth(),
      body: JSON.stringify({
        tournamentId,
        name,
        teamEvent,
        location,
        scoringType,
        tournamentType,
        entryCost,
        maxParticipants,
        startDate
      })
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.tournamentId;
  }

  async deleteTournament(tournamentId) {
    if (!this.loggedIn()) return;
    const res = await fetch("/tournaments/delete", {
      method: "POST",
      headers: this._headersWithAuth(),
      body: JSON.stringify({ tournamentId })
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.deleteStatus;
  }

  async tournaments() {
    if (!this.loggedIn()) return;
    const res = await fetch("/tournaments", {
      method: "GET",
      headers: this._headersWithAuth()
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.tournamentId;
  }

  async searchTournaments(search, filter = {}) {
    if (!this.loggedIn()) return;
    const res = await fetch("/tournaments/search", {
      method: "POST",
      headers: this._headersWithAuth(),
      body: JSON.stringify({ search, filter })
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.tournamentId;
  }

  async createMatch(tournamentId, location, details, time, partyA, partyB) {
    if (!this.loggedIn()) return;
    const res = await fetch(`/tournaments/${tournamentId}/matches/create`, {
      method: "POST",
      headers: this._headersWithAuth(),
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

  async editMatch(
    tournamentId,
    matchId,
    location,
    details,
    time,
    partyA,
    partyB
  ) {
    if (!this.loggedIn()) return;
    const res = await fetch(`/tournaments/${tournamentId}/matches/edit`, {
      method: "POST",
      headers: this._headersWithAuth(),
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

  async deleteMatch(tournamentId, matchId) {
    if (!this.loggedIn()) return;
    const res = await fetch(`/tournaments/${tournamentId}/matches/delete`, {
      method: "POST",
      headers: this._headersWithAuth(),
      body: JSON.stringify({ tournamentId, matchId })
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.deleteStatus;
  }

  async publishMatch(tournamentId, matchId, publish) {
    if (!this.loggedIn()) return;
    const res = await fetch(`/tournaments/${tournamentId}/matches/publish`, {
      method: "POST",
      headers: this._headersWithAuth(),
      body: JSON.stringify({ tournamentId, matchId, publish })
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.publishStatus;
  }

  logout() {
    this.storage.removeItem("userToken");
  }

  setToken(userToken) {
    this.storage.setItem("userToken", userToken);
  }

  getToken() {
    return this.storage.getItem("userToken");
  }

  loggedIn() {
    return Boolean(this.getToken()) && !this.isTokenExpired();
  }

  // returns true if token is not expired
  isTokenExpired() {
    const token = this.getToken();
    try {
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return false;
    }
  }

  _headers() {
    return {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
  }

  _headersWithAuth() {
    return {
      Authorization: `Bearer ${this.getToken()}`,
      ...this._headers()
    };
  }
}
