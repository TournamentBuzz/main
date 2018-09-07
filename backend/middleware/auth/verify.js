var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../../config')

function verifyToken(req, res, next) {
    try {
        const payload = jwt.verify(retrieveToken(req), config.authConfig.authKey);
        req.headers.id = payload.id;
    } catch (e) {
        e.status = 401;
        next(e);
    }
    next();
}

function retrieveToken(req) {
    if (!req.headers.authorization) {
        return null;
    }
    var auth = req.headers.authorization.split(' ');
    if (auth[0] === 'Bearer' && auth[1]) {
        return auth[1];
    }
    return null;
}

module.exports = verifyToken;