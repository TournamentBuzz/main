var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../../config')
var router = express.Router();

router.post('', function(req, res, next) {
    if (req.body.email === "testuser@gatech.edu" && req.body.password === "testpassword") {
        var token = jwt.sign(
            {
                id: 'testuser@gatech.edu'
            }, config.authConfig.authKey, { expiresIn: '15m' });
        res.status(200);
        res.send(JSON.stringify({jwt: token}));
    } else {
        res.status(401);
        res.send(JSON.stringify({status: 401, message: "Invalid Username or Password"}));
    }
});

module.exports = router;