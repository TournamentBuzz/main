import decode from "jwt-decode";

export class IncorrectAuthenticationError extends Error {
  constructor() {
    super("Incorrect Username or Password");
    this.name = "IncorrectAuthenticationError";
  }
}

export class EmailRegisteredError extends Error {
  constructor() {
    super("Email already registered");
    this.name = "EmailRegisteredError";
  }
}

export default class UserAuth {
  constructor(storage = localStorage) {
    this.storage = storage;
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.renew = this.renew.bind(this);
    this.logout = this.logout.bind(this);
  }

  async login(email, password) {
    try {
      const res = await fetch("/user/login", {
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
      } else if (res.status === 401) {
        // API returned unauthorized
        throw new IncorrectAuthenticationError();
      } else {
        // Other API error
        throw new Error();
      }
    } catch (error) {
      if (error.name === "IncorrectAuthenticationError") {
        throw error;
      }
      // cannot connect to API
      throw new Error("Unexpected error: Please try again");
    }
  }

  async register(name, email, password) {
    try {
      const res = await fetch("/user/register", {
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
      } else if (res.status === 409) {
        // User already registered
        throw new EmailRegisteredError();
      } else {
        // Other API error
        throw new Error();
      }
    } catch (error) {
      if (error.name === "EmailRegisteredError") {
        throw error;
      }
      // cannot connect to API
      throw new Error("Unexpected error: Please try again");
    }
  }

  async renew() {
    const token = this.getToken();
    if (!token) return;
    try {
      const res = await fetch("/user/renew", {
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
    this.storage.setItem("userToken", "Bearer " + userToken);
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
