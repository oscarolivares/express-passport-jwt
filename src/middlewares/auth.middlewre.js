const passport = require('passport');

exports.authVerify = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, result, info) => {
    // Check for errors
    if (err) {
      return next(err);
    }
    // When the result is an entire user
    // check if one user was returned from JwtStrategy
    /* if (!result) {
      return res.status(400).send(info.message);
    } */

    //If all is ok insert user in request
    req.payload = result;
    next();
  })(req, res, next);
};
