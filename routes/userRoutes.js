const Router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../lib/auth');

Router.post('/signup',userController.signup);
Router.post('/login',userController.login);
Router.get('/logout',auth,userController.logout);
Router.get('/:id',auth,userController.getUserById);
Router.get('/',auth,userController.getCurentUser);

module.exports = Router;
