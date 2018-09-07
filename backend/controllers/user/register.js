var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../../config')
var sqlwrapper = require('../../model/wrapper');
var connection = require('../../model/connect');
var router = express.Router();

router.post('', function(req, res, next) {
    var c = connection.connect(config.databaseConfig.username, config.databaseConfig.password);
    sqlwrapper.userExists(c, req.body.email).then(function(userExists) {
    	if (userExists) {
    		const err = new Error('User already exists!');
    		err.status = 409;
    		throw err;
    	} else {
    		return sqlwrapper.createUser(c, req.body.name, req.body.email, req.body.password, 0);
    	}
    }).then(function() {
        var token = jwt.sign(
            {
                id: req.body.email
            }, config.authConfig.authKey, { expiresIn: config.authConfig.expiresIn });
        res.status(200);
        res.send(JSON.stringify({jwt: token}));
	}).catch(function(err) {
    	err.status = err.status || 400;
    	next(err);
    });
});

module.exports = router;