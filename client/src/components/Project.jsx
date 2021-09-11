import React from 'react'
import { Tag } from '@chakra-ui/tag'
import {Link} from '@chakra-ui/react'
import {useState} from 'react'
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory,useParams } from 'react-router';
import { useEffect } from 'react';

export default function Project() {

    const {id} = useParams();
    const [project,setProject] = useState({});
    const [starred,setStarred] = useState();
    const isLoggedIn = useSelector((state)=>state.loginState.isLoggedIn);
    const history = useHistory();

    const handleStarClick = ()=>{
        if(starred===true){
            setStarred(false)
            console.log('here')
            axios.put(`/api/project/unstar/${id}`)
            .then((res)=>{
                setProject((prevProject)=>{
                    return {
                        ...prevProject,
                        stars:prevProject.stars-1,
                    }
                })
            })
            .catch(err=>{console.log(err)})
        }
        if(starred===false){
            setStarred(true)
            console.log('here2')
            axios.put(`/api/project/star/${id}`)
            .then((res)=>{
                setProject((prevProject)=>{
                    return {
                        ...prevProject,
                        stars:prevProject.stars+1,
                    }
                })
            })
            .catch(err=>{console.log(err)})
        }

    }

    useEffect(()=>{
        axios.get(`/api/project/${id}`)
        .then((res)=>{
            setProject(res.data);
        })
        .catch((err)=>console.log(err))

        axios.get('/api/project/starred')
        .then((res)=>{
            const starredProjects = res.data;
            setStarred(false);
            console.log(starredProjects)
            starredProjects.forEach((project)=>{
                if(project._id===id) {setStarred(true)}
            })
        })
    },[])

    useEffect(()=>{
        if(isLoggedIn===false){
            history.push('/login')
        }
    },[isLoggedIn])

    return (
        <div className="flex flex-col gap-y-6 pt-20 px-5 lg:px-56 md:px-32 sm:px-5 bg-graybg h-screen">
            <div className="flex flex-row gap-x-2 justify-between">
                <div className="flex flex-row gap-x-2 items-baseline">
                    <h1 className="font-bold text-2xl">{project.name}</h1>
                    <p className="text-sm text-gray-500 font-bold">by {project.ownerName}</p>
                </div>
                <div className="flex flex-row items-center">
                    <button onClick={handleStarClick}><StarTwoToneIcon style={{ color: starred ? "blue" : "grey"}}/></button>
                    <p>{project.stars}</p>
                </div>
            </div>
            <div className="flex flex-col gap-y-3">
                <h3 className="font-bold text-gray-500">Github repository</h3>
                <Tag><Link href={project.repo} isExternal><p className="text-base">{project.repo}</p></Link></Tag>
            </div>

            <div className="flex flex-col gap-y-3">
                <h3 className="font-bold text-gray-500">Description</h3>
                <Tag><p className="text-base">{project.description}</p></Tag>
            </div>
            <div className="flex flex-col gap-y-3">
                <h3 className="font-bold text-gray-500">Project link</h3>
                <Tag><Link href={project.link} isExternal><p className="text-base">{project.link}</p></Link></Tag>
            </div>

        </div>
    )
}
