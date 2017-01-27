const User = require('../models/user');

exports.signup = function(req, res, next){
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

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
			res.json({ success: true });
		});
		
	});
	
	

	

	
}