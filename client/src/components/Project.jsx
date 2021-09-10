import React from 'react'
import { Tag } from '@chakra-ui/tag'
import {Link} from '@chakra-ui/react'
import {useState} from 'react'
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';

export default function Project({ name, owner, description, repo, link, stars }) {

    const [starColor,setStarColor] = useState("grey")

    const handleStarClick = () => {
            if(starColor==="grey") setStarColor("blue")
            else setStarColor("grey")
    }

    return (
        <div className="flex flex-col gap-y-6 pt-20 px-56 bg-graybg h-screen">
            <div className="flex flex-row gap-x-2 justify-between">
                <div className="flex flex-row gap-x-2 items-baseline">
                    <h1 className="font-bold text-2xl">{name}</h1>
                    <p className="text-sm text-gray-500 font-bold">by {owner}</p>
                </div>
                <div className="flex flex-row items-center">
                    <button onClick={handleStarClick}><StarTwoToneIcon style={{ color:starColor}}/></button>
                    <p>{stars}</p>
                </div>
            </div>
            <div className="flex flex-col gap-y-3">
                <h3 className="font-bold text-gray-500">Github repository</h3>
                <Tag><Link href={repo} isExternal><p className="text-base">{repo}</p></Link></Tag>
            </div>

            <div className="flex flex-col gap-y-3">
                <h3 className="font-bold text-gray-500">Description</h3>
                <Tag><p className="text-base">{description}</p></Tag>
            </div>
            <div className="flex flex-col gap-y-3">
                <h3 className="font-bold text-gray-500">Project link</h3>
                <Tag><Link href={link} isExternal><p className="text-base">{link}</p></Link></Tag>
            </div>

        </div>
    )
}
