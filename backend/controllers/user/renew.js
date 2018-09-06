var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

var config = require('../../config');

router.get('', function(req, res, next) {
    var token = jwt.sign(
        {
            id: 'testuser@gatech.edu'
        }, config.authConfig.authKey, { expiresIn: '15m' });
    res.status(200);
    res.send(JSON.stringify({jwt: token}));
});

module.exports = router;