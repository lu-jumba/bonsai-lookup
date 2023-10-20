var express = require('express');
var db = require('../db');



function fetchBonsai(req, res, next) {
	db.all('SELECT * FROM bonsai WHERE owner_id = ?', [req.user.id], (err, rows) => {
		if (err) {
			return next(err);
		}

		var bonsai = rows.map((row) => {
			return {
				id: row.id,
				url: '/' + row.id,
			};
		});
		res.locals.bonsai = bonsai;
		next();
	});
}

var router = express.Router();

/* GET home page. */
router.get(
	'/',
	(req, res, next) => {
		if (!req.user) {
			return res.render('home');
		}
		next();
	},
	fetchBonsai,
	(req, res, next) => {
		res.locals.filter = null;
		res.render('index', { user: req.user });
	},
);



module.exports = router;
