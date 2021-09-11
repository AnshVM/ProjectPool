import React from 'react'
import { Button, Text } from "@chakra-ui/react"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


function Right() {
    const isLoggedIn = useSelector((state) => state.loginState.isLoggedIn);
    const user = useSelector((state) => state.loginState.user);
    if (isLoggedIn) {
        return (
            <div className="flex flex-row items-center">
                <Link to={"/profile/"+user.id}>
                    <AccountCircleIcon />
                </Link>
                <p className="text-black font-semibold">{user.username}</p>
            </div>
        )
    }
    else {
        return (
            <div className="right text-sm">
                <Link to="/login"><Button className="mr-2" colorScheme="teal" variant="outline">Login</Button></Link>
                <Link to="/signup"><Button colorScheme="teal">Signup</Button></Link>
            </div>
        )
    }
}

export default function topbar() {



    return (
        <div className="bg-white flex flex-row justify-between py-6 px-5 lg:px-56 md:px-32 sm:px-5">
            <Link to="/"><Text color="teal" className="font-extrabold text-2xl">ProjectPool</Text></Link>
            <Right />
        </div>
    )
}
