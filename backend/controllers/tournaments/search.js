const express = require('express');
const jwt = require('jsonwebtoken');
const sqlwrapper = require('../../model/wrapper');
const connection = require('../../model/connect');
const router = express.Router();

const requireAuth = require('../../middleware/auth/verify')


router.post('', function(req, res, next) {

});

module.exports = router;