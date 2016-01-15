var express = require('express');
var session = require('express-session');
var router = express.Router();

var User = require('../model/userModel').User;

//Creation Bills
router.post('/AddBills', function(req,res){
  var userBodyBills =  req.body
  console.log("body",userBodyBills);
   User.findOne({'pseudo':req.session.pseudo},function(err,u){
    console.log(" req.session.pseudo ", req.session.pseudo);
    console.log("user",u);
      if(err)
        return res.send({
          'message':err,
          'success':false
       });
      if(!u){
        res.send({
            'message':'user not exists',
            'success':false
        });
      }else{
        console.log('Adding Bill',u,userBodyBills);
          u.bills.push(userBodyBills);
          u.save(function (err) {
            if (err)
              res.send({
                'message':err,
                'success':false
              });
            else
              res.send({
               'success':true
        });
      });   
    }
   });
});

//Recuperation des bills
router.get('/RecupBills',function(req,res){
  req.session.pseudo
  User.findOne({'pseudo':req.session.pseudo},function(err,user){
    if (err) 
      res.send({
        "message" : err,
    });
    if (user)
      res.send({
        "message":'ok',
        "success":user.bills
      });
  });
});

module.exports = router;