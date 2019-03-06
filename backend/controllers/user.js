"use strict";

const express = require("express");
const router = express.Router();

const login = require("./user/login");
const renew = require("./user/renew");
const register = require("./user/register");
const googleauth = require("./user/google-auth");

const requireAuth = require("../middleware/auth/verify");

router.use("/login", login);
router.use("/renew", requireAuth, renew);
router.use("/register", register);
router.use("/google-auth", googleauth);

module.exports = router;
