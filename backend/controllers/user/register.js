const express = require('express');
const jwt = require('jsonwebtoken');
const sqlwrapper = require('../../model/wrapper');
const connection = require('../../model/connect');
const router = express.Router();

router.post('', function(req, res, next) {
    if (!req.body || !req.body.email || !req.body.password || !req.body.name) {
        const err = new Error('Malformed Request');
        err.status = 400;
        next(err);
        return;
    }
    const c = connection.connect(req.app.get('databaseConfig').host,
        req.app.get('databaseConfig').username, req.app.get('databaseConfig').password, req.app.get('databaseConfig').schema);
    sqlwrapper.userExists(c, req.body.email).then(function(userExists) {
    	if (userExists) {
    		const err = new Error('User already exists!');
    		err.status = 409;
    		throw err;
    	} else {
    		return sqlwrapper.createUser(c, req.body.name, req.body.email, req.body.password, 0);
    	}
    }).then(function() {
        const token = jwt.sign(
            {
                id: req.body.email
            }, req.app.get('authConfig').authKey, { expiresIn: req.app.get('authConfig').expiresIn });
        res.status(200);
        res.json({jwt: token});
	}).catch(function(err) {
    	err.status = err.status || 500;
    	next(err);
    });
});

module.exports = router;