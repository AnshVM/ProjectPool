import React from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Radio,
    RadioGroup,
    Stack
} from "@chakra-ui/react"
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

export default function NewProject() {

    const [formState, setFormState] = useState({ name: "", description: "", repo: "", link: "", frontend:"",backend:""})
    const history = useHistory();
    const {isLoggedIn,accessToken} = useSelector((state) => state.loginState);

    if (isLoggedIn === false) {
        history.push('/login')
    }

    const [level,setLevel] = useState("Beginner")
    const [type,setType] = useState("Front-End")

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    const handleCreate = () => {
        axios.post('/api/project/', {...formState,level,type},{headers:{authorization:"Bearer "+accessToken}})
            .then((res) => {
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
                <div className="bg-white"><Input value={formState.name} onChange={handleChange} placeholder="Project name" name="name" /></div>
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
                <div className="bg-white"><Input value={formState.repo} onChange={handleChange} placeholder="Leave it blank if this is just an idea" name="repo" /></div>
            </FormControl>
            <FormControl>
                <FormLabel>Project Link/Demo</FormLabel>
                <div className="bg-white"><Input value={formState.link} onChange={handleChange} placeholder="Leave it blank if this is just an idea" name="link" /></div>
            </FormControl>
            <RadioGroup onChange={setLevel} value={level}>
                <FormLabel>Level</FormLabel>
                <Stack direction="row">
                    <Radio value="Beginner">Beginner</Radio>
                    <Radio value="Intermediate">Intermediate</Radio>
                    <Radio value="Hard">Hard</Radio>
                </Stack>
            </RadioGroup>
            <RadioGroup onChange={setType} value={type}>
                <FormLabel>Type</FormLabel>
                <Stack direction="row">
                    <Radio value="Front-End">Front-End</Radio>
                    <Radio value="Back-End">Back-End</Radio>
                    <Radio value="Full-Stack">Full-Stack</Radio>
                </Stack>
            </RadioGroup>
            <FormControl>
                <FormLabel>Frontend</FormLabel>
                <div className="bg-white"><Input value={formState.frontend} onChange={handleChange} placeholder="Enter terms seperated by a comma. Eg.React,Redux,Nextjs" name="frontend" /></div>
            </FormControl>
            <FormControl>
                <FormLabel>Backend</FormLabel>
                <div className="bg-white"><Input value={formState.backend} onChange={handleChange} placeholder="Enter terms seperated by a comma. Eg.Nodejs,MongoDB,Redis" name="backend" /></div>
            </FormControl>
            <Button onClick={handleCreate} height="50px" colorScheme="blue"><p className="text-xl">Create Project</p></Button>
        </div>
    )
}


//Name,description,git repo,project link
