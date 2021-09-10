import React from 'react'
import { Text } from '@chakra-ui/layout'
import {
    FormControl,
    FormLabel,
    Input,
    Button
} from "@chakra-ui/react"
import {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {login} from '../loginSlice'
import jwt_decode from 'jwt-decode'

export default function Login() {

    const dispatch = useDispatch()
    const history = useHistory();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const emailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value)
    }

    const passwordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value)
    }

    const handleLogin = () => {
        axios.post('/api/user/login',{email,password})
        .then((res)=>{
            if(res.status===200){
                console.log(res)
                const user = jwt_decode(res.data.accessToken);
                console.log(user)
                history.push('/')
                dispatch(login({ isLoggedIn: true,user}))
            }
        })
        .catch((err)=>{console.log(err)})
    }

    return (
        <div className="bg-graybg">
            <div back className="login flex flex-col gap-y-3 m-auto w-1/3 h-screen p-5">
                <Text className="font-bold text-4xl text-black mt-20">Login</Text>
                <Text className="text-gray-400 font-semibold">Complete the below form to login</Text>
                <FormControl id="email">
                    <FormLabel><Text className="text-gray-500 font-semibold">Email address</Text></FormLabel>
                    <div className="bg-white"><Input onChange={emailChange} value={email} className="bg-white" type="email" /></div>
                </FormControl>
                <FormControl id="password">
                    <FormLabel><Text className="text-gray-500 font-semibold">Password</Text></FormLabel>
                    <div className="bg-white"><Input onChange={passwordChange} value={password} className="bg-white" type="password" /></div>
                </FormControl>
                <Button onClick={handleLogin} height="60px" className="mt-5" colorScheme="blue"><p className="text-xl">Login</p></Button>
                
            </div>
        </div>
    )
}