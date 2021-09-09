import React from 'react'
import { Button, Text} from "@chakra-ui/react"

export default function topbar() {
    return (
        <div className="bg-white flex flex-row justify-between py-6 px-56">
            <Text color="teal" className="font-extrabold text-2xl">ProjectPool</Text>
            <div className="right text-sm">
                <Button className="mr-2" colorScheme="teal" variant="outline">Login</Button>
                <Button colorScheme="teal">Signup</Button>
            </div>
        </div>
    )
}
