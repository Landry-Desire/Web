var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session.pseudo)
  		res.render('index', { title: 'hello' });
  	else
  		res.render('login');
});

module.exports = router;
