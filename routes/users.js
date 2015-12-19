var express = require('express');
var session = require('express-session');
var router = express.Router();

var User = require('../model/userModel').User;

router.get('/', function(req, res, next) {
  res.send({'SESSION_VAR':req.session});
});

router.get('/login',function (req, res, next) {
	res.render('login');
});

router.get('/signup',function (req, res, next) {
  res.render('signup');
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

router.get('/logout', function (req, res) {
   delete req.session.pseudo;
   res.send({
        'message':'User Logged Out',
        'success':true
      });
}); 

module.exports = router;