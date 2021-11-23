const fs = require('fs');
const readline = require('readline');
const userInfo = fs.readFileSync('userInfo.txt','utf-8').split(',')
const axios = require('axios')
const projects = require('./ideas')

// { name, description, repo, link, level, type, frontend, backend }

for(let i=0;i<50;i++){
    const [username,email,password] = userInfo[i].split(' ');
    axios.post('https://projectpool.herokuapp.com/api/user/login/',{email,password})
        .then((res)=>{
            const {accessToken} = res.data;
            axios.post('https://projectpool.herokuapp.com/api/project',{...projects[i],repo:"",link:""},{headers:{authorization:"Bearer "+accessToken}})
                .then((res)=>{console.log(res.data)})
                .catch((err)=>console.log(err))
        })
}   
