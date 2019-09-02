const passport = require('passport');

exports.authVerify = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, result, info) => {
    // Check for errors
    if (err) {
      return next(err);
    }

    // Check for empty result
    if (!result) {
      return res.status(400).send(info.message);
    }

    //If all is ok insert result in request
    req.payload = result;
    next();
  })(req, res, next);
};
