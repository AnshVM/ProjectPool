const fs = require('fs');
const userInfo = fs.readFileSync('userInfo.txt', 'utf-8').split(',')
const axios = require('axios');
const projects = require('./ideas');
const args = process.argv.slice(2);

    const [username, email, password] = userInfo[args[0]].split(' ');
    axios.post('https://projectpool.herokuapp.com/api/user/login/', { email, password })
        .then((res) => {
            const { accessToken } = res.data;
            axios.get('https://projectpool.herokuapp.com/api/project/all', { headers: { authorization: "Bearer " + accessToken } })
                .then((res) => {
                    const projects = res.data;
                    for (let j = 0; j < projects.length; j++) {
                        if (Math.random() > 0.5) {
                            axios.put('https://projectpool.herokuapp.com/api/project/star/' + projects[j]._id, {}, { headers: { authorization: "Bearer " + accessToken } })
                                .then((res) => {
                                    console.log(res.data.project.name)
                                })
                                .catch((err) => console.log(err))
                        }
                    }
    
                })
                .catch((err2) => console.log(err2))
        })
        .catch((err3)=>console.log(err3))
