import React from 'react'
import { Text } from '@chakra-ui/layout'
import { Badge } from "@chakra-ui/react"
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';
import {Link} from 'react-router-dom';

export default function ProjectThumbnail({project}) {

    const levelColor = project.level === 'Beginner' ? "text-green-700" : project.level==="Intermediate" ?  "text-yellow-600" : "text-red-500"

    return (
        <Link to={`/project/${project._id}`}><div className="flex flex-col shadow-lg my-4 p-6 gap-y-4 bg-white col-span-1">
            <div className="flex flex-row justify-between items-baseline">
                <div className="flex flex-row gap-x-3 items-center justify-start">
                    <Text color="blue" className="font-bold text-xl ">{project.name}</Text>
                    <p className="text-sm text-gray-600 font-semibold">by {project.ownerName}</p>
                </div>
                <div className="flex flex-row align-middle">
                    <StarTwoToneIcon color="grey" />
                    {project.stars}
                </div>
            </div>
            <p>{project.description && project.description.slice(0,475)}...</p>
            <p className={levelColor+" font-semibold"}>{project.level}</p>
            <div>
                {project.frontend && project.frontend.map((tech)=><Badge colorScheme="teal" className="ml-2">{tech}</Badge>)}
            </div>
            <div>
                {project.backend && project.backend.map((tech)=><Badge colorScheme="teal" className="ml-2">{tech}</Badge>)}
            </div>
        </div></Link>
    )
}
