import React from 'react'
import { Tag } from '@chakra-ui/tag'
import ProjectThumbnail from './ProjectThumbnail'

export default function Profile() {
    const description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "

    return (
        <div className="flex flex-col px-56 bg-graybg h-full py-9 gap-y-6">
            <div className="flex flex-col gap-y-3">
                <h3 className="font-bold text-gray-500">Username</h3>
                <Tag>Ansh Malik</Tag>
            </div>
            <div className="flex flex-col gap-y-3">
                <h3 className="font-bold text-gray-500">Email</h3>
                <Tag>anshmalik2002@gmail.com</Tag>
            </div>

            <div className="flex flex-col ">
                <h3 className="font-bold text-black text-xl">Your projects</h3>
                <ProjectThumbnail name="QuickPoll" description={description} owner="Ansh Malik"/>
                <ProjectThumbnail name="QuickPoll" description={description} owner="Ansh Malik"/>
                <ProjectThumbnail name="QuickPoll" description={description} owner="Ansh Malik"/>
                <ProjectThumbnail name="QuickPoll" description={description} owner="Ansh Malik"/>
            </div>
            <div className="flex flex-col">
                <h3 className="font-bold text-black text-xl">Starred projects</h3>
                <ProjectThumbnail name="QuickPoll" description={description} owner="Ansh Malik"/>
                <ProjectThumbnail name="QuickPoll" description={description} owner="Ansh Malik"/>
                <ProjectThumbnail name="QuickPoll" description={description} owner="Ansh Malik"/>
                <ProjectThumbnail name="QuickPoll" description={description} owner="Ansh Malik"/>
            </div>
        </div>
    )
}
