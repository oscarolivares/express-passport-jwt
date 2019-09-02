const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/User');

// Local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      session: false
    },
    (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false, { message: 'User does not exist' });

        user.verifyPassword(password, (err, match) => {
          if (err) return done(err);
          if (!match) return done(null, false, { message: 'Invalid password' });

          return done(null, user);
        });
      });
    }
  )
);

// JWT strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      algorithms: [process.env.JWT_ALGORITHM]
    },
    (jwtPayload, done) => {
      console.log(jwtPayload);
      User.findById(jwtPayload.sub, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false, { message: 'User does not exist' });

        return done(null, user);
      });
    }
  )
);
