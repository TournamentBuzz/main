class UserAuth {
  constructor(storage = localStorage, domain = "http://localhost:8000") {
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
        // something went wrong
      }
    } catch (error) {
      // something else went wrong
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
}

export default UserAuth;
