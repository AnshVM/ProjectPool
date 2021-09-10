import React from 'react'
import { Button, Text} from "@chakra-ui/react"
import {Link} from 'react-router-dom'

export default function topbar() {
    return (
        <div className="bg-white flex flex-row justify-between py-6 px-56">
            <Text color="teal" className="font-extrabold text-2xl">ProjectPool</Text>
            <div className="right text-sm">
                <Link to="/login"><Button className="mr-2" colorScheme="teal" variant="outline">Login</Button></Link>
                <Link to="/signup"><Button colorScheme="teal">Signup</Button></Link>
            </div>
        </div>
    )
}
