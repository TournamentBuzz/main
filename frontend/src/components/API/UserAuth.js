import * as errors from "./errors";
import Authentication from "./Authentication";

export default class UserAuth {
  constructor() {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.renew = this.renew.bind(this);
    this.logout = this.logout.bind(this);
  }

  async login(email, password) {
    const res = await fetch("/user/login", {
      method: "POST",
      headers: Authentication.withoutJWT(),
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
    Authentication.setToken(json.jwt);
  }

  async register(name, email, password) {
    const res = await fetch("/user/register", {
      method: "POST",
      headers: Authentication.withoutJWT(),
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
    Authentication.setToken(json.jwt);
  }

  async renew() {
    if (!this.loggedIn()) return;
    const res = await fetch("/user/renew", {
      method: "GET",
      headers: Authentication.withJWT()
    });

    if (res.ok) {
      const json = await res.json();
      Authentication.setToken(json.jwt);
    } else {
      this.logout();
    }
  }

  logout() {
    localStorage.removeItem("userToken");
  }
}
