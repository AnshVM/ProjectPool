const Router = require('express').Router();
const auth = require('../lib/auth');
const projectController = require('../controllers/projectController');

Router.post('/',auth,projectController.addProject);
Router.get('/self',auth,projectController.getSelfProjects);
Router.get('/starred',auth,projectController.getStarredProjects);
Router.get('/all',projectController.getAllProjects);
Router.put('/star/:id',auth,projectController.starProject);
Router.put('/unstar/:id',auth,projectController.unstarProject);
Router.get('/:id',auth,projectController.getProjectById);
Router.delete('/:id',auth,projectController.deleteProject)

module.exports = Router;
