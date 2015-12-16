var express = require('express');
var session = require('express-session');
var router = express.Router();

var User = require('./userModel').User;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login',function (req, res, next) {
	res.render('login');
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

router.post('/login', function (req, res,next) {
  var user = req.body;
  var query = User.findUser(user.pseudo); 
  query.exec(function (err, comms) {
    if (err) { throw err; }
    var comm;
      for (var i = 0, l = comms.length; i < l; i++) {
          comm = comms[i];
          req.session = comm._id;
          console.log(req.session);
          console.log('------------------------------');
          console.log('_id : ' + comm._id);
          console.log('Pseudo : ' + comm.pseudo);
          console.log('password : ' + comm.password);
          console.log('------------------------------');

          if(user.password != comm.password){
            res.send("err")
          }else if(user.password == comm.password){
            res.send('ok')
          }else{
            res.send('err')
          }
      }
    })
});

module.exports = router;