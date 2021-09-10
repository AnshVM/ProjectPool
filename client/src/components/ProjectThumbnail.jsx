import React from 'react'
import { Text } from '@chakra-ui/layout'
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import './projectThumbnail.css'

export default function projectThumbnail({ name, description, owner }) {
    return (
        <div className="flex flex-col shadow-lg my-8 p-6 gap-y-4 bg-white">
            <div className="flex flex-row justify-between items-baseline">
                <div className="flex flex-row gap-x-3 items-center justify-start">
                    <Text color="blue" className="font-bold text-xl ">{name}</Text>
                    <p className="text-sm text-gray-600 font-semibold">by {owner}</p>
                </div>
                <div className="flex flex-row gap-x-2 align-middle items-center"> 
                    <StarBorderOutlinedIcon className="star"/>
                    <p>23</p>
                </div>
            </div>
            <p >{description}</p>
        </div>
    )
}
