import decode from "jwt-decode";

export class IncorrectAuthenticationError extends Error {
  constructor() {
    super("Incorrect Username or Password");
    this.name = "IncorrectAuthenticationError";
  }
}

export default class UserAuth {
  constructor(storage = localStorage, domain = "http://localhost:8080") {
    this.storage = storage;
    this.domain = domain;
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.renew = this.renew.bind(this);
    this.logout = this.logout.bind(this);
  }

  async login(email, password) {
    try {
      const res = await fetch(`${this.domain}/user/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        const json = await res.json();
        this.setToken(json.jwt);
      } else {
        // API returned unauthorized
        throw new IncorrectAuthenticationError();
      }
    } catch (error) {
      // cannot connect to API
      if (error instanceof IncorrectAuthenticationError) {
        throw error;
      }
      throw new Error("Unexpected error: Please try again");
    }
  }

  async register(name, email, password) {
    try {
      const res = await fetch(`${this.domain}/user/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password, name })
      });

      if (res.ok) {
        const json = await res.json();
        this.setToken(json.jwt);
      } else {
        // something went wrong
      }
    } catch (error) {
      // something else went wrong
    }
  }

  async renew() {
    const token = this.getToken();
    if (!token) return;
    try {
      const res = await fetch(`${this.domain}/user/renew`, {
        method: "GET",
        headers: {
          Authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      if (res.ok) {
        const json = await res.json();
        this.setToken(json.jwt);
      } else {
        this.logout();
      }
    } catch (error) {
      // something else went wrong
    }
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
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // returns true if token is not expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return false;
    }
  }
}
