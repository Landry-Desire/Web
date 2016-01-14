var express = require('express');
var session = require('express-session');
var router = express.Router();

var User = require('../model/userModel').User;

router.get('/all', function(req, res, next) {
	console.log(">>>/all");
	User.find({},{pseudo:1},function(err,r){
		if(err)
			res.send(err);
		else
			res.send(r);
	})
});

router.get('/login',function (req, res, next) {
	res.render('login');
});

router.get('/signup',function (req, res, next) {
	res.render('signup');
});

router.put('/',function (req,res,next) {
	var user = req.body;
	console.log(user);
	User.update({'pseudo':user.pseudo},
		{
			$set : {"friends":user.friends}	
		},function (err, r) {
			if(err){
				console.log('err',err);
				res.send({'error':err});
			}
			res.send(r);
		});
});
router.post('/signup',function (req, res, next) {
	var userBody =  req.body
	var u = new User();
	User.findOne({'pseudo':userBody.pseudo},function (err,user) {
		if(err)
			res.send({
				'message':err,
				'success':false
			});
		if(user){
			res.send({
				'message':'user already exists',
				'success':false
			});
		}else{
			u.pseudo  = userBody.pseudo;
			u.password = userBody.password;
			u.save(function (err) {
				if (err)
					res.send({
						'message':err,
						'success':false
					});
				res.send({
					'message':'A user with <i>pseudo : <b>'+u.pseudo+'</b></i> created. Please login !',
					'success':true
				});
			});		
		}
	});
});

router.post('/login',function(req,res,next){
	var users = req.body;
	User.findOne({'pseudo':users.pseudo},function(err,user){
		if(err)
			res.send({
				'message':err,
				'success':false
			}); 
		if(user){
			console.log(user)
			req.session.user = user;
			req.session.pseudo = user.pseudo;
			console.log(req.session.pseudo)
			if(user.pseudo==users.pseudo && user.password==users.password){
				res.send({
					'message':'User <i> '+user.pseudo+' </i> authenticated !',
					'success':true
				});
			}else if(user.pseudo==users.pseudo && user.password!=users.password)
			{
				res.send({
					'message':'user not found',
					'success':false
				});
			}
		}else{
			res.send({
				'message':'User not found',
				'success':false
			});

		}
	});
});

router.post('/logout', function (req, res) {
	delete req.session.pseudo;
	res.send({
		'message':'User Logged Out',
		'success':true
	});
}); 

router.get('/', function(req, res, next) {
	User.findOne({'pseudo':req.session.user.pseudo},function(err,user){
		if(err)
			res.send(err);
		res.send(user);
	});
});

module.exports = router;