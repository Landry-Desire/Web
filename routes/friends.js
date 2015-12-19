var express = require('express');
var session = require('express-session');
var router = express.Router();

var User = require('../model/userModel').User;

router.use(function (req,res,next) {
	if(req.session.pseudo)
		next();
	else
		res.send({
	    	'message':'You need to be logged in',
	    	'success':false
	    });
});

router.get('/', function(req, res, next) {
  User.findOne({'pseudo':req.session.pseudo},function (err,user) {
		if(err)
			res.send({
		        'message':err,
		        'success':false
		    });
		if(user){
			res.send({
		        'message':'Your friends',
		        'data' : {'friends' : user.friends},
		        'success':true
		    });
		}else{
			res.send({
		        'message':'user doesn\'t exist' ,
		        'success':false
		    });
		}	
	});
});

router.post('/add', function(req, res, next){
	var me = req.session.pseudo;
	var him = req.body.pseudo;
	User.findOne({'pseudo':me}, function(err, u){
		if(err)
			res.send({
		        'message':err,
		        'success':false
		    });
		if(u){
			res.send(User.addFriend(u,him));
		}else{
			res.send({
		        'message':'user doesn\'t exist' ,
		        'success':false
		    });
		}
	});
});


module.exports = router;