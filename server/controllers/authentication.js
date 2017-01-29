const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user){
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next){
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

	if (!username || !email || !password){
		return res.status(422).send({ error: "Please provide username, email and password"});
	}
	// Do a check for username and password separately, and return a message error
	// Check if username or email exists
	User.findOne({ $or: [{ username: username}, {email: email }] }, function(err, existingUser){
		if(err){ return next(err); }
		
		// If username or email exists return an error
		if(existingUser){
			return res.status(422).send({ error: 'Username with given email already exists' });
		}
		// If does not exists, create and save record
		const user = new User({
			username: username,
			email: email,
			password: password
		});

		user.save(function(err){
			if(err){return next(err);}
			// Respond to request indicating user was created
			res.json({ token: tokenForUser(user) });
		});
		
	});
	
	

	

	
}