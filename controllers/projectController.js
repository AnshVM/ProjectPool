const Project = require('../models/Project');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');


exports.addProject = async (req, res) => {


    const owner = req.id;
    const ownerName = req.username;
    let { name, description, repo, link, level, type, frontend, backend } = req.body
    frontend = frontend.split(',');
    backend = backend.split(',')

    const newProject = {
        name,
        owner,
        ownerName,
        description,
        repo,
        link,
        stars: 0,
        level,
        type,
        frontend,
        backend,
    }
    Project.create(newProject, async (err, project) => {
        if (err) return res.json(err);
        const user = await User.findById(owner);
        user.projects.push(project._id)
        await user.save();
        return res.status(201).json(project);
    })

}

exports.getProjectById = async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) return res.status(404).json("Project not found");
    res.status(200).json(project);
}

exports.starProject = async (req, res) => {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);
    project.stars++;
    await project.save();
    const user = await User.findById(req.id);
    user.starred.push(projectId)
    await user.save();
    res.status(201).json({ user, project })
}

exports.unstarProject = async (req, res) => {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);
    project.stars--;
    await project.save();
    const user = await User.findById(req.id);
    user.starred = user.starred.filter((item) => { return item !== projectId });
    await user.save();
    res.status(201).json({ project, user })
}

exports.getSelfProjects = async (req, res) => {
    const user = await User.findById(req.id);
    let resObject = [];
    for (let i = 0; i < user.projects.length; i++) {
        const p = await Project.findById(user.projects[i]);
        resObject.push(p);
    }
    return res.status(200).json(resObject)
}

exports.getStarredProjects = async (req, res) => {
    const user = await User.findById(req.id);
    let resObject = [];
    for (let i = 0; i < user.starred.length; i++) {
        const p = await Project.findById(user.starred[i]);
        resObject.push(p);
    }
    return res.status(200).json(resObject)
}

exports.getAllProjects = async (req, res) => {
    const projects = await Project.find({})
    return res.status(200).json(projects);
}

exports.deleteProject = async (req, res) => {
    const { id } = req.params;
    Project.deleteOne({ _id: id }, async (err) => {
        if (err) console.log(err)
        const user = await User.findById(req.id);
        user.projects = user.projects.filter((project) => project !== id)
        user.save();
        res.status(200).json("Project has been deleted")
    })
}