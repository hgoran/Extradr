const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user){
	const timestamp = new Date().getTime();
	// sub and iat is jwt payload
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next){
	// user has already email and pass, just need to give them a token
	res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next){
	const email = req.body.email;
	const password = req.body.password;

	// if (!username || !email || !password){
	// 	return res.status(422).send({ error: 'Please provide username, email and password'});
	// }
	// Do a check for username and password separately, and return a message error
	// Check if email exists
	User.findOne({email: email }, function(err, existingUser){
		if(err){ return next(err); }

		// If username or email exists return an error
		// if(existingUser){
		// 	if(email === existingUser.email){
		// 		return res.status(422).send({ error: 'Email already exists' });
		// 	} else if (username === existingUser.username){
		// 		return res.status(422).send({ error: 'Username is already taken' });
		// 	} else {
		// 		return res.status(422).send({ error: 'Username or email already exists' });
		// 	}	
		// }
		
		if(existingUser){
			return res.status(422).send({ error: 'Email is already in use' });
		}

		// If does not exists, create and save record
		const user = new User({
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

