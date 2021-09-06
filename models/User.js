const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:String,
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validaor.isEmail,"Please provide a valid email"],
    },
    password:{
        type:String,
        required:[true,"Please enter your passowrd"]
    },
    projects:{
        type:String,
        unique:true
    }
})