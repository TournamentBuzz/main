var express = require('express');
var router = express.Router();

var login = require('./user/login');
var renew = require('./user/renew');
var register = require('./user/register');

var requireAuth = require('../middleware/auth/verify')

router.use('/login', login);
router.use('/renew', requireAuth, renew);
router.use('/register', register);

module.exports = router;
