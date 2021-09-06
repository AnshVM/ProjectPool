const Project = require('../models/Project');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

exports.addProject = async(req,res) => {
    const accessToken = req.cookies.accessToken ? req.cookies.accessToken.split(' ')[1] : "";
    let owner;
    jwt.verify(accessToken,process.env.SECRET_KEY,(err,decoded)=>{
        owner = decoded.id;
    })
    const {name,description,repo,link} = req.body();
    const newProject = {
        name,
        owner,
        description,
        repo,
        link,
        stars:0
    }
    Project.create(newProject,(err,project)=>{
        if(err) return res.json(err);
        console.log('New project created:'+JSON.stringify(project))
        return res.status(201).json(project);
    })
}

exports.getProjectById = async(req,res)=>{
    const {id} = req.params;
    const project = await Project.findById(id);
    if(!project) return res.status(404).json("Project not found");
    res.status(200).json(project);
}

exports.starProject = async(req,res) => {
    //increment stars of project
    const projectId = req.params.id;
    const project = await Project.findById(projectId);
    project.stars++;
    await project.save();
    //add ptoject id to starred projects
    const accessToken = req.cookies.accessToken ? req.cookies.accessToken.split(' ')[1] : "";
    jwt.verify(accessToken,process.env.SECRET_KEY,(err,decoded)=>{
        const {userId} = decoded;
        const user = User.findById(userId);
        user.starred.push(id)
        await user.save();
    })
}

exports.unstarProject = async(req,res) => {
    //increment stars of project
    const {projectId} = req.params;
    const project = await Project.findById(projectId);
    project.stars--;
    await project.save();
    //add ptoject id to starred projects
    const accessToken = req.cookies.accessToken ? req.cookies.accessToken.split(' ')[1] : "";
    jwt.verify(accessToken,process.env.SECRET_KEY,(err,decoded)=>{
        const {userId} = decoded;
        const user = User.findById(userId);
        user.starred.filter((item)=>item!==projectId);
        await user.save();
    })
}

exports.getSelfProjects = async(req,res)=>{
    const accessToken = req.cookies.accessToken ? req.cookies.accessToken.split(' ')[1] : "";
    jwt.verify(accessToken,process.env.SECRET_KEY,(err,decoded)=>{
        const {id} = decoded;
        const user = await User.findById(id);
        let resObject = [];
        user.projects.forEach((projectId)=>{
            const project = await Project.findById(projectId);
            resObject.push(project);
        })
        return res.status(200).json(resObject)
    })
}

exports.getStarredProjects = async(req,res) => {
    const accessToken = req.cookies.accessToken ? req.cookies.accessToken.split(' ')[1] : "";
    jwt.verify(accessToken,process.env.SECRET_KEY,(err,decoded)=>{
        const {id} = decoded;
        const user = await User.findById(id);
        let resObject = [];
        user.starred.forEach((projectId)=>{
            const project = await Project.findById(projectId);
            resObject.push(project);
        })
        return res.status(200).json(resObject)
    })
}

exports.getAllProjects = async(req,res) => {
    const projects = Project.find({})
    return res.status(200).json(projects);
}