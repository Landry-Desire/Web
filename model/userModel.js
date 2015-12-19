var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSch = new Schema({
	pseudo : {type:String, unique:true, required:true},
	password : String,
	friends : [String],
	bills : [
		{
			description : String,
			mine : Boolean,
			amount : Number,
			splitType : String,
			split : [
				{pseudo:String, part:Number}
			]
		}
	]
});

UserSch.statics.addFriend = function (me,f) {
	function isInArray(value, array) {
  		return array.indexOf(value) > -1;
	}
	this.model('User').findOne({'pseudo':f}, function(err, u){
		if(err)
			throw err;
		if(u){
			if(!isInArray(me.pseudo,u.friends))
				u.friends.push(me.pseudo);
			if(!isInArray(f,me.friends))
				me.friends.push(f);
			console.log(u.save())
			console.log(me.save());
			console.log('user updated');
			return {
		        'message':'Friend added',
		        'success':true
		    };
		}else{
			return {
		        'message' : 'This friend not in our system invite him',
		        'success':false
		    };
		}

	});
}

var conn 	= mongoose.connect('mongodb://127.0.0.1/Landry-Desire_Web');
var User 	= conn.model('User', UserSch);
var model 	= mongoose.model('User', UserSch);

exports.User = User;