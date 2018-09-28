const express = require('express');
const router = express.Router();
const sqlwrapper = require("../model/wrapper");
const connection = require("../model/connect");

const search = require('./tournaments/search');

const requireAuth = require('../middleware/auth/verify')

router.use('/search', search);

router.get('/', async function(req, res, next) {
	try {
		const c = connection.connect(
		  req.app.get("databaseConfig").host,
		  req.app.get("databaseConfig").username,
		  req.app.get("databaseConfig").password,
		  req.app.get("databaseConfig").schema
		);
		const results = await sqlwrapper.executeSQL(c, "SELECT * from tournaments");
		res.status(200);
		res.json({tournaments: results});
	} catch (err) {
		next(err);
	}
});


module.exports = router;