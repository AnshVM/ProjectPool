const validator = require('validator')
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:String,
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please provide a valid email"],
    },
    password:{
        type:String,
        required:[true,"Please enter your passowrd"]
    },
    projects:{
        type:[String],
    },
    starred:{
        type:[String]
    }
})

const User = new mongoose.model('User',userSchema);
module.exports = User;