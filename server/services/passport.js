const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

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