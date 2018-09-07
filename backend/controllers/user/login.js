var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var sqlwrapper = require('../../model/wrapper');
var connection = require('../../model/connect');
var router = express.Router();

router.post('', function(req, res, next) {
    var c = connection.connect(config.databaseConfig.username, config.databaseConfig.password);
    sqlwrapper.checkCredentials(c, req.body.email, req.body.password).then(function(validCredentials) {
        if (validCredentials) {
            var token = jwt.sign(
                {
                    id: req.body.email
                }, config.authConfig.authKey, { expiresIn: config.authConfig.expiresIn });
            res.status(200);
            res.send(JSON.stringify({jwt: token}));
        } else {
            const err = new Error('Invalid Username or Password');
            err.status = 401;
            next(err);
        }
    }).catch(function(err) {
        next(err);
    });
});

module.exports = router;