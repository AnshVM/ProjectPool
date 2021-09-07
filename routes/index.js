const Router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');

Router.use('/user',userRoutes);
Router.use('/project',projectRoutes);

module.exports = Router;