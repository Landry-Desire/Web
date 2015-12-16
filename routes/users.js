var express = require('express');
var session = require('express-session');
var router = express.Router();

var User = require('./userModel').User;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login',function (req, res, next) {

  console.log(req.session.pseudo);
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

router.post('/login',function(req,res,next){
  var users = req.body;
  User.findOne({'pseudo':users.pseudo},function(err,user){
    if(err)
      console.log(err);
    if(user){
        console.log(user)
        req.session.pseudo = user.pseudo;
        console.log(req.session.pseudo)
        if(user.pseudo==users.pseudo && user.password==users.password){
          res.send({'success':'ok'})
          //res.require('/')
        }else if(user.pseudo==users.pseudo && user.password!=users.password)
        {
          res.send({'error':'User or password not found'})
        }
    }else{
      res.send({'error':'bad user!'})
    }
  });


});

module.exports = router;