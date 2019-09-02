const Router = require('express').Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middlewre');

Router.post('/signup', authController.signup);
Router.post('/login', authController.login);
//aRouter.get('/logout', authVerify, sessionController.logout);

Router.get('/user-info', authMiddleware.authVerify, (req, res) => {
  res.json(req.payload.email);
});

module.exports = Router;
