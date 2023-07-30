import React, { useContext, useEffect, useState } from 'react'
import '../../Assets/CSS/global.css'
import { credentials } from '../Utilities/Credentials'
import axios from 'axios'

// react icons
import { AiOutlineHeart } from 'react-icons/ai'
import { BiPlus } from 'react-icons/bi'

// images
import album1 from '../../Assets/Images/album1.jpg'
import album2 from '../../Assets/Images/album2.jpg'
import album3 from '../../Assets/Images/album3.jpg'
import { useStateProvider } from '../Utilities/StateProvider'
import Description from './Description'
import SeveralAlbums from '../Explore/SeveralAlbums'
import NewReleases from '../Explore/NewReleases'
import Artist from './Artists'


function Explore(props) {
    const {setDescription} = props
    return (
        <>
            <div className='flex mb-16 lg:mb-0 modifiedScrollbar items-center justify-start flex-col overflow-y-scroll w-full lg:max-h-[600px]'>
                {/* several albums */}
                <SeveralAlbums setDescription={setDescription} />

                {/* New Releases */}
                <NewReleases setDescription={setDescription} />

                {/* Artists */}
                <Artist setDescription={setDescription}/>
            </div>
        </>
    )
}

export default Explore