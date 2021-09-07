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
    const {name,description,repo,link} = req.body
    const newProject = {
        name,
        owner,
        description,
        repo,
        link,
        stars:0
    }
    Project.create(newProject,async (err,project)=>{
        if(err) return res.json(err);
        const user = await User.findById(owner);
        user.projects.push(project._id)
        await user.save();
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
    console.log(project)
    //add ptoject id to starred projects
    const accessToken = req.cookies.accessToken ? req.cookies.accessToken.split(' ')[1] : "";
    jwt.verify(accessToken,process.env.SECRET_KEY,async (err,decoded)=>{
        const userId = decoded.id;
        console.log(userId)
        const user = await User.findById(userId);
        console.log(user)
        user.starred.push(projectId)
        await user.save();
        console.log(user);
        res.status(201).json({user,project})
    })
}

exports.unstarProject = async(req,res) => {
    //increment stars of project
    const projectId = req.params.id;
    const project = await Project.findById(projectId);
    project.stars--;
    await project.save();
    //add ptoject id to starred projects
    const accessToken = req.cookies.accessToken ? req.cookies.accessToken.split(' ')[1] : "";
    jwt.verify(accessToken,process.env.SECRET_KEY,async (err,decoded)=>{
        const userId = decoded.id;
        const user = await User.findById(userId);
        user.starred = user.starred.filter((item)=>{return item!==projectId});
        await user.save();
        res.status(201).json({project,user})
    })
}

exports.getSelfProjects = async(req,res)=>{
    const accessToken = req.cookies.accessToken ? req.cookies.accessToken.split(' ')[1] : "";
    jwt.verify(accessToken,process.env.SECRET_KEY,async (err,decoded)=>{
        const {id} = decoded;
        const user = await User.findById(id);

        let resObject = [];
        for(let i=0;i<user.projects.length;i++){
            const p = await Project.findById(user.projects[i]);
            resObject.push(p);
        }
        return res.status(200).json(resObject)
    })
}

exports.getStarredProjects = async(req,res) => {
    const accessToken = req.cookies.accessToken ? req.cookies.accessToken.split(' ')[1] : "";
    jwt.verify(accessToken,process.env.SECRET_KEY,async(err,decoded)=>{
        const {id} = decoded;
        const user = await User.findById(id);
        let resObject = [];
        for(let i=0;i<user.starred.length;i++){
            const p = await Project.findById(user.starred[i]);
            resObject.push(p);
        }
        return res.status(200).json(resObject)
    })
}

exports.getAllProjects = async(req,res) => {
    const projects = await Project.find({})
    return res.status(200).json(projects);
}