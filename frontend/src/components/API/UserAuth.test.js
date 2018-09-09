import UserAuth from "./UserAuth";

const name = "George P. Burdell";
const email = "gburdell3@gatech.edu";
const password = "thwg1927";
const jwt = "<jwt>";
const newJwt = "<new jwt>";

let userAuth;
let storage;
beforeEach(() => {
  storage = new StorageMock();
  userAuth = new UserAuth(storage);
  fetch.resetMocks();
});

describe("login", () => {
  it("sends credentials", async () => {
    try {
      await userAuth.login(email, password);
    } catch (error) {
      // pass
    } finally {
      const [uri, request] = fetch.mock.calls[0];
      expect(uri).toEqual("/user/login");
      expect(request.method).toEqual("POST");
      expect(JSON.parse(request.body)).toMatchObject({ email, password });
    }
  });

  it("receives and sets a jwt token on validation", async () => {
    fetch.once(JSON.stringify({ jwt }));
    await userAuth.login(email, password);
    expect(storage.getItem("userToken")).toEqual(jwt);
    expect(userAuth.getToken()).toEqual(jwt);
  });

  it("responds to invalid credentials", async () => {
    fetch.once(JSON.stringify({ jwt }), { status: 403 });
    await expect(userAuth.login(email, password)).rejects.toHaveProperty(
      "name",
      "IncorrectAuthenticationError"
    );
    expect(storage.getItem("userToken")).toBeUndefined();
    expect(userAuth.getToken()).toBeUndefined();
  });
});

describe("register", () => {
  it("sends registration", async () => {
    try {
      await userAuth.register(name, email, password);
    } catch (error) {
      // pass
    } finally {
      const [uri, request] = fetch.mock.calls[0];
      expect(uri).toEqual("/user/register");
      expect(request.method).toEqual("POST");
      expect(JSON.parse(request.body)).toMatchObject({ email, password, name });
    }
  });

  it("receives and sets a jwt token on validation", async () => {
    fetch.once(JSON.stringify({ jwt }));
    await userAuth.register(name, email, password);
    expect(storage.getItem("userToken")).toEqual(jwt);
    expect(userAuth.getToken()).toEqual(jwt);
  });

  it("responds to invalid registration", async () => {
    fetch.once("", { status: 403 });
    await expect(userAuth.login(name, email, password)).rejects.toHaveProperty(
      "name",
      "IncorrectAuthenticationError"
    );
    expect(storage.getItem("userToken")).toBeUndefined();
    expect(userAuth.getToken()).toBeUndefined();
  });
});

describe("renew", () => {
  beforeEach(() => {
    storage.setItem("userToken", jwt);
  });

  it("sends renewal", async () => {
    await userAuth.renew();
    const [uri, request] = fetch.mock.calls[0];
    expect(uri).toEqual("/user/renew");
    expect(request.method).toEqual("GET");
    expect(request.headers["Authorization"]).toEqual(jwt);
  });

  it("receives a new jwt token", async () => {
    fetch.once(JSON.stringify({ jwt: newJwt }));
    await userAuth.renew();
    expect(storage.getItem("userToken")).toEqual(newJwt);
    expect(userAuth.getToken()).toEqual(newJwt);
  });

  it("logs out on invalid renewal request", async () => {
    fetch.once("", { status: 403 });
    await userAuth.renew();
    expect(storage.getItem("userToken")).toBeUndefined();
    expect(userAuth.getToken()).toBeUndefined();
  });
});

it("logout", () => {
  storage.setItem("userToken", jwt);
  userAuth.logout();
  expect(storage.getItem("userToken")).toBeUndefined();
  expect(userAuth.getToken()).toBeUndefined();
});

it("loggedIn", () => {
  expect(userAuth.loggedIn()).toBe(false);
  storage.setItem("userToken", jwt);
  expect(userAuth.loggedIn()).toBe(true);
});
