import React from 'react'
import { Text } from '@chakra-ui/layout'
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';
import {Link} from 'react-router-dom';

export default function ProjectThumbnail({project}) {
    return (
        <Link to={`/project/${project._id}`}><div className="flex flex-col shadow-lg my-4 p-6 gap-y-4 bg-white">
            <div className="flex flex-row justify-between items-baseline">
                <div className="flex flex-row gap-x-3 items-center justify-start">
                    <Text color="blue" className="font-bold text-xl ">{project.name}</Text>
                    <p className="text-sm text-gray-600 font-semibold">by {project.ownerName}</p>
                </div>
                <div className="flex flex-row gap-x-2 align-middle items-center">
                    <StarTwoToneIcon style={{ color: "blue" }} />
                    <p>{project.stars}</p>
                </div>
            </div>
            <p >{project.description && project.description.slice(0,475)}...</p>
        </div></Link>
    )
}
