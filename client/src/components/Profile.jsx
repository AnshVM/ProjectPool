import React from 'react'
import { Tag } from '@chakra-ui/tag'
import ProjectThumbnail from './ProjectThumbnail'
import {useSelector} from 'react-redux'
import {Button} from '@chakra-ui/react'
import {Link,useHistory} from 'react-router-dom'
import axios from 'axios'
import Project from './Project'
import {useState,useEffect} from 'react'

export default function Profile() {
    const description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "
    const user = useSelector((state)=>state.loginState.user)
    const history = useHistory();
    const {isLoggedIn,accessToken} = useSelector((state)=>state.loginState);
    const [yourProjects,setYourProjects] = useState([{}]);
    const [starredProjects,setStarredProjects] = useState([{}])

    if(isLoggedIn===false){
        history.push('/login')
    }

    useEffect(()=>{
        axios.get('/api/project/self',{headers:{authorization:"Bearer "+accessToken}})
        .then(res=>{console.log(res.data);setYourProjects(res.data)})
        .catch(err=>{console.error(err)})

        axios.get('/api/project/starred',{headers:{authorization:"Bearer "+accessToken}})
        .then(res=>{setStarredProjects(res.data)})
        .catch(err=>console.error(err))
    },[])

    return (
        <div className="flex flex-col px-5 lg:px-56 md:px-32 sm:px-5 bg-graybg h-full min-h-screen py-9 gap-y-6">
            <div className="flex flex-col gap-y-3">
                <h3 className="font-bold text-gray-500">Username</h3>
                <Tag>{user.username}</Tag>
            </div>
            <div className="flex flex-col gap-y-3">
                <h3 className="font-bold text-gray-500">Email</h3>
                <Tag>{user.email}</Tag>
            </div>

            <div className="flex flex-col gap-y-3">
                <h3 className="font-bold text-black text-xl">Your projects</h3>
                <Link to="/new"><Button variant="outline" size="md" width="150px" colorScheme="teal">New project</Button></Link>
                {yourProjects.map((project)=><ProjectThumbnail  key={project._id} project={project} />)}
            </div>
            <div className="flex flex-col">
                <h3 className="font-bold text-black text-xl">Starred projects</h3>
                {starredProjects.map((project)=><ProjectThumbnail key={project._id} project={project} />)}

            </div>
        </div>
    )
}
