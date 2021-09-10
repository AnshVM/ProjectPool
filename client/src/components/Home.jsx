import React from 'react'
import ProjectThumbnail from './ProjectThumbnail';
import Topbar from './topbar';

export default function Home() {

    const description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "

    return (
        <div>
            <Topbar/>
            <div className="main px-56 bg-graybg p-3">
                <h1 className="text-lg font-bold text-gray-600">Popular projects</h1>
                <ProjectThumbnail name="QuickPoll" description={description} owner="Ansh Malik"/>
                <ProjectThumbnail name="QuickPoll" description={description} owner="Ansh Malik"/>
                <ProjectThumbnail name="QuickPoll" description={description} owner="Ansh Malik"/>
                <ProjectThumbnail name="QuickPoll" description={description} owner="Ansh Malik"/>
            </div>
        </div>
    )
}

