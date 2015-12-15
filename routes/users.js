var express = require('express');
var router = express.Router();

var User = require('./userModel').User;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup',function (req, res, next) {
	var user =  req.body
	var u = new User();
	u.pseudo  = user.pseudo;
	u.password = user.password;
	u.save(function (err) {
		if (err)
			console.error(err);
		console.log("signed up ",u.pseudo);
		res.send({redir:'/'});
	})
});

module.exports = router;
