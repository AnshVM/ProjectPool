import React from 'react'
import { Text } from '@chakra-ui/layout'
import {
    FormControl,
    FormLabel,
    Input,
    Button
} from "@chakra-ui/react"
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Signup() {

    const history = useHistory();
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    
    const handleSubmit = () => {
        axios.post('/api/user/signup',{
            email,
            username,
            password
        })
        .then((res)=>{
            if(res.status===201)
                history.push('/login')
        })
        .catch((err)=>console.log(err))
    }

    const usernameChange = (e)=>{
        e.preventDefault();
        setUsername(e.target.value)
    }

    const emailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value)
    }

    const passwordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value)
    }

    return (
        <div className="bg-graybg">
            <div back className="signup flex flex-col gap-y-3 m-auto sm:w-2/3 md:w-2/3 lg:w-1/3 h-screen p-5">
                <Text className="font-bold text-4xl text-black mt-20">Sign up</Text>
                <Text className="text-gray-400 font-semibold">Complete the below form to signup for ProjectPool</Text>
                <FormControl id="username">
                    <FormLabel><Text className="text-gray-500 font-semibold">Username</Text></FormLabel>
                    <div className="bg-white"><Input onChange={usernameChange} className="bg-white" type="name" value={username}/></div>
                </FormControl>
                <FormControl id="email">
                    <FormLabel><Text className="text-gray-500 font-semibold">Email address</Text></FormLabel>
                    <div className="bg-white"><Input onChange={emailChange} className="bg-white" type="email" value={email}/></div>
                </FormControl>
                <FormControl id="password">
                    <FormLabel><Text className="text-gray-500 font-semibold">Password</Text></FormLabel>
                    <div className="bg-white"><Input onChange={passwordChange} className="bg-white" type="password" value={password}/></div>
                </FormControl>
                <Button onClick={handleSubmit} height="60px" className="mt-5" colorScheme="blue"><p className="text-xl">Sign up</p></Button>
            </div>
        </div>
    )
}
