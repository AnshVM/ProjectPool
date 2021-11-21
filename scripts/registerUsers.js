const fs = require('fs');
const readline = require('readline');
const axios = require('axios');

const rl = readline.createInterface({
  input: fs.createReadStream('names.txt'),
  crlfDelay: Infinity
});


rl.on('line', (name) => {
    const username = name.split(' ')[0];
    const password = username;
    const email = `${username}@xmail.com`;
    fs.appendFile('ids.txt',`${username} ${email} ${password},`,(err)=>console.log(err))
    axios.post('http://localhost:5000/api/user/signup/',{username,password,email})
        .then((res)=>{
            console.log(res.data);
        })
        .catch((err)=>console.log('err'))
});
