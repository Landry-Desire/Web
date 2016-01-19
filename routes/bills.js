var express = require('express');
var session = require('express-session');
var router = express.Router();

var User = require('../model/userModel').User;

//Creation Bills
router.post('/AddBills', function(req,res){
  'use strict';
  /*console.log(req.body);*/
  var userBodyBills =  req.body;
  userBodyBills.split = [];
  userBodyBills.mine = true;
  if(userBodyBills.splitType === "EQUAL"){
    userBodyBills.split.push({ pseudo : req.session.pseudo, part : 1 });
  }
  else{
    userBodyBills.split.push({ pseudo : req.session.pseudo, part: userBodyBills.amount});
  }
  console.log("body",userBodyBills);
   User.findOne({pseudo:req.session.pseudo},function(err,u){
      if(err){
        return res.send({
          message:err,
          success:false
        });
      }
      if(!u){
        res.send({
            message:'user not exists',
            success:false
        });
      }else{
          u.bills.push(userBodyBills);
          u.save(function (err) {
            if (err){
              res.send({
                message:err,
                success:false
              });
            }
            else{
              res.send({
               success:true
              });
            }
      });
    }
   });
});

router.get('/RecupBills',function(req,res){
  'use strict';
  User.findOne({pseudo:req.session.pseudo},function(err,user){
    if(err){
      res.send({
        message : err
      });
    }
    if (user){
      res.send({
        message:'ok',
        success:user.bills
      });
    }
  });
});

router.put('/',function (req,res) {
  var bill = req.body;
  console.log(bill);
  for(var i in bill.split){
    User.findOne({'pseudo':bill.split[i].pseudo},function (e,u) {
      var done = false;
      for(var j in u.bills){
        if(u.bills[j]==bill._id){
          u.bills[j] = bill;
          done = true;
        }
      }
      if(!done){
        u.bills.push(bill);
      }
      u.save(function (e) {
        if(e){
          console.log(e);
          throw e;
        }
      });
    });
  }
  res.send({'msg':'done'});
});
module.exports = router;