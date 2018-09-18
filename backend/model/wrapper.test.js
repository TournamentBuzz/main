"use strict";

const mysql = require("mysql");
const bcrypt = require("bcrypt");

const config = require("../config");
const sqlwrapper = require("./wrapper");
const connection = require("./connect");

const databaseConfig = {
  host: config.databaseConfig.host,
  username: config.databaseConfig.username,
  password: config.databaseConfig.password,
  schema: "tempwrapperjestschema"
};

async function setupTemporarySchema(host, username, password, temporarySchema) {
  const c = mysql.createConnection({
    host: host,
    user: username,
    password: password
  });
  c.connect();
  const setupSchemaQuery = "CREATE SCHEMA " + temporarySchema + ";";
  await sqlwrapper.executeSQL(c, setupSchemaQuery, []);
  c.destroy();
  const specC = mysql.createConnection({
    host: host,
    user: username,
    password: password,
    database: temporarySchema
  });
  specC.connect();
  const setupUsersTableQuery = `CREATE TABLE users (
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        userName VARCHAR(60),
        admin BOOL DEFAULT FALSE NOT NULL,
        PRIMARY KEY(email)
    );`;
  await sqlwrapper.executeSQL(specC, setupUsersTableQuery, []);
  specC.destroy();
}

async function cleanupTemporarySchema(
  host,
  username,
  password,
  temporarySchema
) {
  const c = mysql.createConnection({
    host: host,
    user: username,
    password: password
  });
  c.connect();
  const setupSchemaQuery = "DROP SCHEMA " + temporarySchema + ";";
  await sqlwrapper.executeSQL(c, setupSchemaQuery, []);
  c.destroy();
}

describe("sql wrapper", () => {
  beforeAll(async () => {
    await setupTemporarySchema(
      databaseConfig.host,
      databaseConfig.username,
      databaseConfig.password,
      databaseConfig.schema
    );
  });

  afterAll(async () => {
    await cleanupTemporarySchema(
      databaseConfig.host,
      databaseConfig.username,
      databaseConfig.password,
      databaseConfig.schema
    );
  });

  test("Execute SQL", async done => {
    const testQuery = "SELECT * FROM users;";
    const c = connection.connect(
      databaseConfig.host,
      databaseConfig.username,
      databaseConfig.password,
      databaseConfig.schema
    );
    const result = await sqlwrapper.executeSQL(c, testQuery, []);
    if (!result) {
      throw new Error("Something went wrong.");
    }
    if (result.length !== 0) {
      throw new Error(
        "Row count not 0 as expected, got " + result.length.toString()
      );
    }
    done();
  });

  test("Create user", async done => {
    const testGetUsers = "SELECT * FROM users;";
    const testUserName = "Test Create User";
    const testUserEmail = "testCreateUser@gatech.edu";
    const testUserPassword = "testcreateuserpassword";
    const c = connection.connect(
      databaseConfig.host,
      databaseConfig.username,
      databaseConfig.password,
      databaseConfig.schema
    );
    await sqlwrapper.createUser(
      c,
      testUserName,
      testUserEmail,
      testUserPassword,
      0
    );
    const result = await sqlwrapper.executeSQL(c, testGetUsers, []);
    c.destroy();
    if (!result) {
      throw new Error("Something went wrong.");
    }
    if (result.length !== 1) {
      throw new Error(
        "Row count not 1 as expected, got " + result.length.toString()
      );
    }
    const email = result[0].email;
    const password = result[0].password;
    const name = result[0].userName;
    if (email !== testUserEmail) {
      throw new Error(
        "Email is not as expected, should be: " +
          testUserEmail +
          ", instead got: " +
          email
      );
    }
    if (name !== testUserName) {
      throw new Error(
        "Name is not as expected, should be: " +
          testUserName +
          ", instead got: " +
          name
      );
    }
    const correctPassword = await bcrypt.compare(testUserPassword, password);
    if (!correctPassword) {
      throw new Error("Password match failed.");
    }
    done();
  });

  test("User Exists", async done => {
    const testUserEmail = "testUserExists@gatech.edu";
    const testUserName = "Test User Exists";
    const testUserPassword = "testuserexistspassword";
    const insertUserQuery =
      "INSERT INTO users(email, password, username, admin) VALUES (?, ?, ?, false);";
    const c = connection.connect(
      databaseConfig.host,
      databaseConfig.username,
      databaseConfig.password,
      databaseConfig.schema
    );
    await sqlwrapper.executeSQL(c, insertUserQuery, [
      testUserEmail,
      testUserPassword,
      testUserName
    ]);
    const exists = await sqlwrapper.userExists(c, testUserEmail);
    c.destroy();
    if (!exists) {
      throw new Error(
        "Expected for user to exist, instead got user does not exist."
      );
    }
    done();
  });

  test("Check Valid Credentials", async done => {
    const saltrounds = 10;
    const testUserEmail = "testCheckValidCredentials@gatech.edu";
    const testUserName = "Test Check Valid Credentials";
    const testUserPassword = "testcheckvalidcredentialspassword";
    const testUserHashedPassword = await bcrypt.hash(
      testUserPassword,
      saltrounds
    );
    const insertUserQuery =
      "INSERT INTO users(email, password, username, admin) VALUES (?, ?, ?, false);";
    const c = connection.connect(
      databaseConfig.host,
      databaseConfig.username,
      databaseConfig.password,
      databaseConfig.schema
    );
    await sqlwrapper.executeSQL(c, insertUserQuery, [
      testUserEmail,
      testUserHashedPassword,
      testUserName
    ]);
    const validCredentials = await sqlwrapper.checkCredentials(
      c,
      testUserEmail,
      testUserPassword
    );
    c.destroy();
    if (!validCredentials) {
      throw new Error(
        "Expected valid credentials, instead got invalid credentials."
      );
    }
    done();
  });

  test("Check Invalid Credentials", async done => {
    const saltrounds = 10;
    const testUserEmail = "testCheckInvalidCredentials@gatech.edu";
    const testUserName = "Test Check Invalid Credentials";
    const testUserPassword = "testcheckinvalidcredentialspassword";
    const testUserHashedPassword = await bcrypt.hash(
      testUserPassword,
      saltrounds
    );
    const insertUserQuery =
      "INSERT INTO users(email, password, username, admin) VALUES (?, ?, ?, false);";
    const c = connection.connect(
      databaseConfig.host,
      databaseConfig.username,
      databaseConfig.password,
      databaseConfig.schema
    );
    await sqlwrapper.executeSQL(c, insertUserQuery, [
      testUserEmail,
      testUserHashedPassword,
      testUserName
    ]);
    const validCredentials = await sqlwrapper.checkCredentials(
      c,
      testUserEmail,
      "invalid credentials"
    );
    c.destroy();
    if (validCredentials) {
      throw new Error(
        "Expected invalid credentials, instead got valid credentials."
      );
    }
    done();
  });
});
