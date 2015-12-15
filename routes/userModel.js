var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSch = new Schema({
	pseudo : String,
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

UserSch.statics.findUser = function (pseudo, callback) {
	return this.find({pseudo:pseudo});
}

var conn 	= mongoose.connect('mongodb://127.0.0.1/Landry-Desire_Web');
var User 	= conn.model('User', UserSch);

exports.User = User;