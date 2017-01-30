const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
	username: { type: String, unique: true },
	email: { type: String, unique: true, lowercarse: true },
	password: String
});
// On save hook, encrypt password
// before saving the model run func
userSchema.pre('save', function(next){
	// get access to user model
	const user = this;
	// generate a salt then run callback
	bcrypt.genSalt(10, function(err, salt){
		if(err) { return next(err); }
		// hash/encrypt password using salt 
		bcrypt.hash(user.password, salt, null, function(err, hash){
			if(err) { return next(err); }
			// overwrite plain text password with encrypted password
			user.password = hash;
			next();
		});	
	});
});

userSchema.methods.comparePassword = function(candidatePassword, callback){
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		if(err){ return callback(err); }
	
		callback(null, isMatch);
	});
};

// Create model class
const ModelClass = mongoose.model('user', userSchema);
// Export the model
module.exports = ModelClass;