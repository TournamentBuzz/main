var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

var config = require('../../config');

router.get('', function(req, res, next) {
    var token = jwt.sign(
        {
            id: req.headers.id
        }, config.authConfig.authKey, { expiresIn: config.authConfig.expiresIn });
    res.status(200);
    res.send(JSON.stringify({jwt: token}));
});

module.exports = router;