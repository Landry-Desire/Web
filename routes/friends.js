var express = require('express');
var session = require('express-session');
var router = express.Router();

var User = require('../model/userModel').User;

router.use(function (req,res,next) {
	/*console.log('req',req);*/
	if(req.session.pseudo)
		next();
	else
		res.send({
	    	'message':'You need to be logged in',
	    	'success':false
	    });
});

router.get('/mine', function(req, res, next) {
	/*console.log('user.findOne');*/
	User.findOne({'pseudo':req.session.pseudo},function (err,user) {
		/*console.log('user.findOne',user);*/
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
	var me = req.session.user.pseudo;
	var him = req.body.pseudo;
	/*console.log(me, him);*/
	User.findOne({'pseudo':me}, function(err, u){
		if(err)
			res.send({
		        'message':err,
		        'success':false
		    });
		if(u){
/*			console.log('got user '+me);
*/			res.send(User.addFriend(u,him));
		}else{
			res.send({
		        'message':'user doesn\'t exist' ,
		        'success':false
		    });
		}
	});
});

module.exports = router;