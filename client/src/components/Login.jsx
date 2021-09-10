import React from 'react'
import Topbar from './topbar'
import { Text } from '@chakra-ui/layout'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button
} from "@chakra-ui/react"

export default function Signup() {
    return (
        <div className="bg-graybg">
            <div back className="login flex flex-col gap-y-3 m-auto w-1/3 h-screen p-5">
                <Text className="font-bold text-4xl text-black mt-20">Login</Text>
                <Text className="text-gray-400 font-semibold">Complete the below form to login</Text>
                <FormControl id="email">
                    <FormLabel><Text className="text-gray-500 font-semibold">Email address</Text></FormLabel>
                    <div className="bg-white"><Input className="bg-white" type="email" /></div>
                </FormControl>
                <FormControl id="password">
                    <FormLabel><Text className="text-gray-500 font-semibold">Password</Text></FormLabel>
                    <div className="bg-white"><Input className="bg-white" type="password" /></div>
                </FormControl>
                <Button height="60px" className="mt-5" colorScheme="blue"><p className="text-xl">Login</p></Button>
                
            </div>
        </div>
    )
}