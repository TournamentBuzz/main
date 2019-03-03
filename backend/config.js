"use strict";

module.exports = {
  serverConfig: {
    env: process.env.ENV || "development",
    port: process.env.PORT || "8080"
  },
  authConfig: {
    authKey: process.env.AUTH_EC_KEY || "testsecret",
    expiresIn: "15m"
  },
  databaseConfig: {
    host: process.env.DB_HOST || "localhost",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || "3306",
    schema: process.env.DB_NAME || "tournamentbuzz"
  },
  stripeConfig: {
    secretKey: process.env.STRIPE_SECRET_KEY
  }
};
