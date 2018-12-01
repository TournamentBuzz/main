import * as errors from "./errors";
import Authentication from "./Authentication";

export default class TeamAPI {
  static async createTeam(tournamentId, teamName) {
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

  static async withdrawTeam(tournamentId, teamId) {
    if (!Authentication.loggedIn()) return;
    const res = await fetch(`/tournaments/id/${tournamentId}/teams/withdraw`, {
      method: "POST",
      headers: Authentication.withJWT(),
      body: JSON.stringify({ teamId })
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.withdrawStatus;
  }

  static async inviteToTeam(teamId, email) {
    const res = await fetch(`/teams/invite`, {
      method: "POST",
      headers: Authentication.withJWT(),
      body: JSON.stringify({ teamId, email })
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.inviteStatus;
  }

  static async removeFromTeam(teamId, email) {
    const res = await fetch(`/teams/remove`, {
      method: "POST",
      headers: Authentication.withJWT(),
      body: JSON.stringify({ teamId, email })
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.kickStatus;
  }

  static async promote(teamId, email) {
    const res = await fetch(`/teams/promote`, {
      method: "POST",
      headers: Authentication.withJWT(),
      body: JSON.stringify({ teamId, email })
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.inviteStatus;
  }

  static async removeFromTeam(teamId, email) {
    const res = await fetch(`/teams/remove`, {
      method: "POST",
      headers: Authentication.withJWT(),
      body: JSON.stringify({ teamId, email })
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.kickStatus;
  }

  static async promote(teamId, email) {
    const res = await fetch(`/teams/promote`, {
      method: "POST",
      headers: Authentication.withJWT(),
      body: JSON.stringify({ teamId, email })
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.promoteStatus;
  }

  static async getTeams(tournamentId) {
    const res = await fetch(`/tournaments/id/${tournamentId}/teams`, {
      method: "GET",
      headers: Authentication.withJWT()
    });
    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.teams;
  }

  static async getTeam(teamId) {
    const res = await fetch(`/teams/id/${teamId}`, {
      method: "GET",
      headers: Authentication.withJWT()
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.team;
  }

  static async getTeamMembers(teamId) {
    const res = await fetch(`/teams/id/${teamId}/members`, {
      method: "GET",
      headers: Authentication.withJWT()
    });

    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.members;
  }

  static async getPendingInvites() {
    if (!Authentication.loggedIn()) return;
    const res = await fetch("/invites", {
      method: "GET",
      headers: Authentication.withJWT()
    });
    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.team;
  }

  static async acceptInvite(teamId) {
    if (!Authentication.loggedIn()) return;
    const res = await fetch("/invites/accept", {
      method: "POST",
      headers: Authentication.withJWT(),
      body: JSON.stringify({ teamId })
    });
    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.acceptStatus;
  }

  static async declineInvite(teamId) {
    if (!Authentication.loggedIn()) return;
    const res = await fetch("/invites/decline", {
      method: "POST",
      headers: Authentication.withJWT(),
      body: JSON.stringify({ teamId })
    });
    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.declineStatus;
  }

  static async payForTeam(teamId, token) {
    const res = await fetch("/teams/charge", {
      method: "POST",
      headers: Authentication.withJWT(),
      body: JSON.stringify({ teamId, token })
    });
    if (!res.ok) {
      throw new errors.UnexpectedError();
    }
    const json = await res.json();
    return json.paymentStatus;
  }
}
