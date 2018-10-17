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
  const setupTournamentsTableQuery = `CREATE TABLE tournaments (
    id INT(10) NOT NULL UNIQUE AUTO_INCREMENT,
      creator VARCHAR(255) NOT NULL,
      description VARCHAR(255) DEFAULT NULL,
      maxTeamSize INT(5) NOT NULL DEFAULT 1,
      location VARCHAR(255) DEFAULT NULL,
      scoringType ENUM('Points') NOT NULL DEFAULT 'Points',
      tournamentName VARCHAR(255) DEFAULT NULL,
      tournamentType ENUM('Single Elim', 'Double Elim', 'Round-robin') NOT NULL DEFAULT 'Single Elim',
      entryCost INT(5) NOT NULL DEFAULT 0,
      maxTeams INT(5) NOT NULL DEFAULT 16,
      startDate DATE DEFAULT NULL,
      endDate DATE DEFAULT NULL,
      PRIMARY KEY(id),
      FOREIGN KEY(creator)
      REFERENCES users(email)
  );`;
  await sqlwrapper.executeSQL(specC, setupTournamentsTableQuery, []);
  const setupTeamsTableQuery = `CREATE TABLE teams (
    id INT(12) NOT NULL UNIQUE AUTO_INCREMENT,
      teamName VARCHAR(255),
      leader VARCHAR(255) NOT NULL,
      tournament INT(10) NOT NULL,
      seed INT(4) DEFAULT NULL,
      PRIMARY KEY(id),
      FOREIGN KEY(leader)
      REFERENCES users(email),
      FOREIGN KEY(tournament)
      REFERENCES tournaments(id)
  );`;
  await sqlwrapper.executeSQL(specC, setupTeamsTableQuery, []);
  const setupMatchesTableQuery = `CREATE TABLE matches (
    id INT(12) NOT NULL UNIQUE AUTO_INCREMENT,
      location VARCHAR(255) DEFAULT NULL,
      score VARCHAR(255) DEFAULT NULL,
      matchTime DATETIME DEFAULT NULL,
      matchName VARCHAR(255) DEFAULT NULL,
      tournament INT(10) NOT NULL,
      teamA INT(12) NOT NULL,
      teamB INT(12) NOT NULL,
      PRIMARY KEY(id),
      FOREIGN KEY(tournament)
      REFERENCES tournaments(id),
      FOREIGN KEY(teamA)
      REFERENCES teams(id),
      FOREIGN KEY(teamB)
      REFERENCES teams(id)
  );`;
  await sqlwrapper.executeSQL(specC, setupMatchesTableQuery, []);
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

  test("Create Tournament", async done => {
    // This test requires the create user to test to pass as tournaments needs it as a foreign key
    const c = connection.connect(
      databaseConfig.host,
      databaseConfig.username,
      databaseConfig.password,
      databaseConfig.schema
    );
    const testUserEmail = "testUserExists@gatech.edu";
    const testTournamentName = "test tournament";
    const getTestTournament =
      "SELECT * FROM tournaments WHERE tournamentName = ?;";
    await sqlwrapper.createTournament(c, testUserEmail, testTournamentName);
    const result = await sqlwrapper.executeSQL(c, getTestTournament, [
      testTournamentName
    ]);
    if (result.length < 1) {
      throw new Error("Did not find tournament in table upon searching.");
    }
    done();
  });

  test("Search/Get Tournament", async done => {
    const c = connection.connect(
      databaseConfig.host,
      databaseConfig.username,
      databaseConfig.password,
      databaseConfig.schema
    );
    const testTournamentName = "test tournament";
    const result = await sqlwrapper.searchTournament(c, testTournamentName);
    if (result.length < 1) {
      throw new Error("Did not find tournament in table upon searching.");
    }
    const testId = result[0].id;
    const name = result[0].tournamentName;
    const exists = await sqlwrapper.getTournament(c, testId);
    if (exists.length < 1) {
      throw new Error("Expected for tournament to be returned.");
    }
    if (name !== testTournamentName) {
      throw new Error("Name field does not match.");
    }
    done();
  });
});
