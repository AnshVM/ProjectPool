const mongoose = require('mongoose');
const validator = require('validator');

const projectSchema = new mongoose.Schema({
    name:String,
    owner:String,
    description:String,
    repo:String,
    link:"",
    stars:""
})

const Project = new mongoose.model('Project',projectSchema);

module.exports = Project;