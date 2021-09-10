const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req,res,next) => {
    if(!req.cookies.accessToken){
        return res.status(401).json("Unauthorized");
    }
    const accessToken = req.cookies.accessToken;
    jwt.verify(accessToken,process.env.SECRET_KEY,(err,decoded)=>{
        if(err) return res.status(401).json("Unauthorized");
        next();
    })
}