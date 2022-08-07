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
import { formatMs } from '@material-ui/core';

const isNumber = (c) => c >= '0' && c <= '9';
const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

const validations = [
    {
        name: "Password Length",
        func: (str) => str.length > 10,
        error: "Password should be greater than 10 characters"
    },
    {
        name: "Uppercase",
        func: (str) => str.split('').reduce((prev, char) => char.toUpperCase() === char || prev, false),
        error: "Password should contain atleast one uppercase character",
    },
    {
        name: "Lowercase",
        func: (str) => str.split('').reduce((prev, char) => char.toLowerCase() === char || prev, false),
        error: "Password should contain atleast one lowercase character",
    },
    {
        name: "Symbol",
        func: (str) => regex.test(str),
        error: "Password should contain atleast one symbol",
    },
    {
        name: "Number",
        func: (str) => str.split('').reduce((prev, char) => isNumber(char) || prev, false),
        error: "Password should contain atleast one number",
    }

]

const validate = (str) => validations.find((val) => val.func(str) === false)

export default function Signup() {

    const history = useHistory();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = () => {

        const err = validate(password);
        if (err) return setError(err);

        axios.post('/api/user/signup', {
            email,
            username,
            password
        })
            .then((res) => {
                if (res.status === 201)
                    history.push('/login')
            })
            .catch((err) => console.log(err))
    }

    const usernameChange = (e) => {
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
                    <div className="bg-white"><Input onChange={usernameChange} className="bg-white" type="name" value={username} /></div>
                </FormControl>
                <FormControl id="email">
                    <FormLabel><Text className="text-gray-500 font-semibold">Email address</Text></FormLabel>
                    <div className="bg-white"><Input onChange={emailChange} className="bg-white" type="email" value={email} /></div>
                </FormControl>
                <FormControl id="password">
                    <FormLabel><Text className="text-gray-500 font-semibold">Password</Text></FormLabel>
                    <div className="bg-white"><Input onChange={passwordChange} className="bg-white" type="password" value={password} /></div>
                </FormControl>
                {error && (
                    <div className='text-center'>
                        <p style={{color:'red'}}>{error.error}</p>
                    </div>
                )}
                <Button onClick={handleSubmit} height="60px" className="mt-5" colorScheme="blue"><p className="text-xl">Sign up</p></Button>
            </div>
        </div>
    )
}
