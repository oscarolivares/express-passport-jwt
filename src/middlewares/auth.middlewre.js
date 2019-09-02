const passport = require('passport');

exports.authVerify = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    // Check for errors
    if (err) {
      return next(err);
    }
    // Check if one user was returned from JwtStrategy
    if (!user) {
      return res.status(400).send(info.message);
    }

    //If all is ok insert user in request
    req.user = user;
    next();
  })(req, res, next);
};
