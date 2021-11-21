import React from 'react'
import ProjectThumbnail from './ProjectThumbnail';
import axios from 'axios'
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@chakra-ui/react'
import {useSelector} from 'react-redux'

export default function Home() {
    const description = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "
    const accessToken = useSelector((state)=>state.loginState.accessToken)
    const [popular, setPopular] = useState()

    useEffect(() => {
        axios.get('/api/project/all',{
            headers:{
                Authorization:"Bearer "+accessToken
            }
        })
            .then((res) => {
                res.data.sort((a, b) => a.stars - b.stars)
                res.data.reverse()
                setPopular(res.data)
            })
            .catch((err) => { console.log(err) })
    })

    return (
        <div>
            <div className="main px-5 lg:px-56 md:px-32 h-full min-h-screen sm:px-5 bg-graybg p-3">
                <p className="mb-8 text-center font-semibold text-lg">Whether its a fully functioning App, a work in progress or even if its just an idea feel free to put it up here.</p>
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-lg font-bold text-gray-600">Popular projects</h1>
                    <Link to="/new"><Button colorScheme="teal" className="mr-3" variant="outline" >New Project / Idea</Button></Link>
                </div>
                <div className="grid grid-flow-rows grid-cols-2 gap-4">
                    {popular && popular.map((project) => {
                        return <ProjectThumbnail project={project} />
                    })}
                </div>

            </div>
        </div>
    )
}

