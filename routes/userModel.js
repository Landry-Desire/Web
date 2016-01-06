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


var conn 	= mongoose.connect('mongodb://127.0.0.1/Landry-Desire_Web');
var User 	= conn.model('User', UserSch);

exports.User = User;