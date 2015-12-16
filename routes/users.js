var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient


var User = require('./userModel').User;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login',function (req, res, next) {
	res.send('Nothing yet');
})
router.post('/signup',function (req, res, next) {
	var userBody =  req.body
	var u = new User();
	User.findOne({'pseudo':userBody.pseudo},function (err,user) {
		if(err)
			console.log(err);
		if(user){
			res.send({'error':'user already in bd'});
		}else{
			u.pseudo  = userBody.pseudo;
			u.password = userBody.password;
			u.save(function (err) {
				if (err)
					console.error(err);
				console.log("signed up ",u.pseudo);
				res.redirect('/users/login');
			});		
		}

	});
	
});

module.exports = router;
