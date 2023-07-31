import React from 'react'
import Playlists from '../Home/Playlists'

function Library(props) {
    const { setDescription } = props
    return (
        <div className='grid pt-6 pb-12 grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 mb-16 modifiedScrollbar items-center justify-start flex-col overflow-y-scroll w-full lg:max-h-[72vh]'>
            <Playlists setDescription={setDescription}/>
        </div>
    )
}

export default Library