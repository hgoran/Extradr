const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// crate local strategy
// available options in passport local strategy are usernameField and passwordField, that is why is usernameField:email
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
	// verify email and pass, call done with the user
	User.findOne({ email: email }, function(err, user){
		if(err) { return done(err); }
		if(!user) { return done(null, false); }

		// compare passwords - is 'password' equal user.password
		user.comparePassword(password, function(err, isMatch){
			if(err) { return done(err); }
			if(!isMatch) { return done(null, false); }
			return done(null, user);
		});

	});

});
// setup options for JWT strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

// create JWT strategy
// payload is returned form tokenForUser =>(sub and iat)
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
	// see if the user id in the payload exists in out db
	// if does call 'done' otherwise call 'done' without a user object
	User.findById(payload.sub, function(err, user){
		if(err) { return done(err, false); }

		if(user) {
			done(null, user);
		} else {
			done(null, false);
		}

	});
	
});

// tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);