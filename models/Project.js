const mongoose = require('mongoose');
const validator = require('validator');

const projectSchema = new mongoose.Schema({
    name:String,
    owner:String,
    ownerName:String,
    description:String,
    repo:String,
    link:String,
    stars:Number,
    level:String,
    type:String,
    frontend:[String],
    backend:[String]
})

const Project = new mongoose.model('Project',projectSchema);

module.exports = Project;