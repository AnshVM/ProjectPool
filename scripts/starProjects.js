const fs = require('fs');
const userInfo = fs.readFileSync('userInfo.txt', 'utf-8').split(',')
const axios = require('axios')



for (let i = 30; i < 35; i++) {
    const [username, email, password] = userInfo[i].split(' ');
    axios.post('http://localhost:5000/api/user/login/', { email, password })
        .then((res) => {
            const { accessToken } = res.data;
            axios.get('http://localhost:5000/api/project/all', { headers: { authorization: "Bearer " + accessToken } })
                .then((res) => {
                    const projects = res.data;
                    console.log("USER" + i)
                    for (let j = 0; j < projects.length; i++) {
                        if (Math.random() > 0.5) {
                            axios.put('http://localhost:5000/api/project/star/' + projects[i]._id, {}, { headers: { authorization: "Bearer " + accessToken } })
                                .then((res) => {
                                    console.log(res.data.project.name)
                                })
                                .catch((err) => console.log('err'))
                        }
                    }

                })
                .catch((err2) => console.log(err2))
        })
}