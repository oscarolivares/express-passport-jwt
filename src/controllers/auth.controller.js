const User = require('../models/User');
const testPasswordStrength = require('../helpers/testPasswordStrength');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Controller for signup
async function signup(req, res, next) {
  try {
    // Check if user exist and password strenght
    const checkUserExist = User.findOne({ email: req.body.email });
    const testPassword = testPasswordStrength(req.body.password);

    const [userMatch, passwordStrenght] = await Promise.all([
      checkUserExist,
      testPassword
    ]);

    if (userMatch) {
      return res.status(400).send('Email exist');
    }

    if (passwordStrenght !== 'high') {
      return res.status(400).send('Invalid password');
    }

    // If all is ok:

    // Create a new user
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      fristname: req.body.fristname || '',
      lastname: req.body.lastname || ''
    });

    // Save new user in the db
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

// Controller for login
function login(req, res, next) {
  // Login using the local strategy
  passport.authenticate('local', { session: false }, (error, user, info) => {
    // Check for errors
    if (error) {
      return next(error);
    }
    // Check if one user was returned from LocalStrategy
    if (!user) {
      return res.status(400).send(info.message);
    }

    // If all is ok:

    // Payload for token
    const payload = {
      sub: user._id,
      iat: Date.now(),
      exp: Date.now() + parseInt(process.env.JWT_LIFETIME),
      email: user.email
    };

    // Generate token
    const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET, {
      algorithm: process.env.JWT_ALGORITHM
    });

    // Respond a json with token
    res.json({ token: token });
  })(req, res, next);
}

const authController = {
  signup,
  login
};

module.exports = authController;
