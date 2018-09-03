class UserAuth {
  constructor() {
    super();
    this.domain = "http://localhost:8000";
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.renew = this.renew.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(email, password) {
    fetch(`${this.domain}/user/login`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          email: email,
          password: password
      })
    }).then(res => {
        if(res.ok) {
          this.setToken(res.jwt)
        } else {
            // something went wrong
        }
    }).catch(error => {
        // something else went wrong
    });
  }

  register(name, email, password) {
    fetch(`${this.domain}/user/register`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password,
            name: name
        })
      }).then(res => {
          if(res.ok) {
            this.setToken(res.jwt)
          } else {
              // something went wrong
          }
      }).catch(error => {
          // something else went wrong
      });
  }

  renew() {
      if (!token) {
          return;
      }
      fetch(`${this.domain}/user/renew`, {
        method: "GET",
        headers: {
          "Authorization": this.getToken(),
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }).then(res => {
          if(res.ok) {
            this.setToken(res.jwt)
          } else {
              // something went wrong
          }
      }).catch(error => {
          // something else went wrong
      });
  }

  logout() {
      localStorage.removeItem("userToken");
  }

  setToken(userToken) {
    localStorage.setItem("userToken", userToken);
  }

  getToken() {
      return localStorage.getItem("userToken");
  }
}

export default UserAuth;