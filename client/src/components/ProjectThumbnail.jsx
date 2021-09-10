import React from 'react'
import { Text } from '@chakra-ui/layout'
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';
import {useState} from 'react';

export default function ProjectThumbnail({ name, description, owner }) {

    const [starColor,setStarColor] = useState("grey")

    const handleStarClick = () => {
            if(starColor==="grey") setStarColor("blue")
            else setStarColor("grey")
    }

    return (
        <div className="flex flex-col shadow-lg my-8 p-6 gap-y-4 bg-white">
            <div className="flex flex-row justify-between items-baseline">
                <div className="flex flex-row gap-x-3 items-center justify-start">
                    <Text color="blue" className="font-bold text-xl ">{name}</Text>
                    <p className="text-sm text-gray-600 font-semibold">by {owner}</p>
                </div>
                <div className="flex flex-row gap-x-2 align-middle items-center">
                    <button onClick={handleStarClick}><StarTwoToneIcon style={{ color: starColor }} /></button>
                    <p>23</p>
                </div>
            </div>
            <p >{description}</p>
        </div>
    )
}
