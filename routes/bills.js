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
/*
  
*/
//Add Friends --> bills
router.put('/friendsBills/:index',function(req,res){
  var friend = req.body.pseudo; 
  var friendsBodyBills = req.body;
  var billsfriends;
  //console.log("body",friendsBodyBills);
   User.findOne({'pseudo':req.session.pseudo},function(err,u){
      if(err)
        res.send({
          'message':err,
          'success':false
       });
      if(!u){
        res.send({
            'message':'user not exists',
            'success':false
        });
      }else{
          //console.log(" index " + u.bills[req.params.index]);
          //var userFriends = new User();
          u.bills[req.params.index].split.push(friendsBodyBills);
          billsfriends = u.bills[req.params.index];
          //userFriends.pseudo = req.body.pseudo;
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
   console.log("friend " +friend );
   User.findOne({'pseudo':friend},function(err,user){
    if(err)
        res.send({
          "message":err,
          "success":false
        });
      if(!user){
        res.send({
            'message':'user not exists',
            'success':false
        });
      }else{
        user.bills.push(billsfriends);
        user.bills[req.params.index].mine="false";
        user.save(function(err){
          if(err)
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
module.exports = router;