import React from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button
} from "@chakra-ui/react"
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'

export default function NewProject() {

    const [formState,setFormState] = useState({name:"",description:"",repo:"",link:""})
    const history = useHistory();
    const isLoggedIn = useSelector((state)=>state.loginState.isLoggedIn);
    if(isLoggedIn===false){
        history.push('/login')
    }

    const handleChange = (e) => {
        setFormState({...formState,[e.target.name]:e.target.value})
    }

    const handleCreate = () => {
        axios.post('/api/project/',formState)
        .then((res)=>{
            console.log(res)
            history.goBack();
        })
    }

    return (
        <div className="bg-graybg h-full flex flex-col px-5 lg:px-56 md:px-32 sm:px-5 pt-6 pb-20 mb-0 gap-y-4">
            <h1 className="text-black text-2xl font-bold">Create new project</h1>
            <p className="text-gray-500 font-semibold">Fill the form below to create a new project.</p>
            <FormControl id="project-name" isRequired>
                <FormLabel>Project Name</FormLabel>
                <div className="bg-white"><Input value={formState.name} onChange={handleChange} placeholder="Project name" name="name"/></div>
            </FormControl>
            <FormControl id="description" isRequired>
                <FormLabel>Description</FormLabel>
                <div className="bg-white"><Textarea
                    placeholder="Enter the project description"
                    rows="8"
                    name="description"
                    value={formState.description} 
                    onChange={handleChange} 
                /></div>
            </FormControl>
            <FormControl>
                <FormLabel>Github repository link</FormLabel>
                <div className="bg-white"><Input value={formState.repo} onChange={handleChange}  placeholder="Optional" name="repo"/></div>
            </FormControl>
            <FormControl>
                <FormLabel>Project Link/Demo</FormLabel>
                <div className="bg-white"><Input value={formState.link} onChange={handleChange}  placeholder="Optional" name="link" /></div>
            </FormControl>
            <Button onClick={handleCreate} height="50px" colorScheme="blue"><p className="text-xl">Create Project</p></Button>
        </div>
    )
}


//Name,description,git repo,project link
