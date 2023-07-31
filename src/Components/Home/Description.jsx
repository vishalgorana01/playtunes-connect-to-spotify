import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useStateProvider } from '../Utilities/StateProvider'

import '../../Assets/CSS/global.css'

import image1 from '../../Assets/Images/album1.jpg'
import image2 from '../../Assets/Images/album2.jpg'

// react-icons
import { AiFillPlayCircle, AiOutlineHeart } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import { BiTime } from 'react-icons/bi'
import { colorPalette } from '../Utilities/ColorPalette'
import { myContext } from '../Utilities/AudioContext'


function Description(props) {
    const {audioUrl, setAudioUrl} = useContext(myContext)
    const [{ token }, dispatch] = useStateProvider()
    const { id } = props

    const [desc, setDesc] = useState(
        <>
            <div className='flex items-center justify-center w-full px-6 py-5 sm:px-12' style={{ background: 'radial-gradient(#f54d69, transparent)' }}>
                <span className='flex gap-x-5 items-center justify-start w-full sm:gap-x-8' >
                    <img className='h-16 sm:h-28 lg:h-36' src={image1} alt="error loading" />
                    <span className='flex text-left font-semibold gap-y-1.5 flex-col items-start justify-center sm:gap-y-3.5'>
                        <h4 className='italic text-xs sm:text-sm md:text-md lg:text-lg'>playlist</h4>
                        <h1 className=' sm:text-3xl md:text-4xl lg:text-5xl'>Name of the playlist</h1>
                        <h5 className='text-xs sm:text-md'>title of the playlist</h5>
                    </span>
                </span>
            </div>

            <div className='flex text-3xl gap-x-5 items-center justify-start w-full py-3.5 px-6 sm:px-12' style={{ background: `${colorPalette.tertiary}` }}>
                <AiFillPlayCircle className='cursor-poitner text-3xl sm:text-5xl' />
                <AiOutlineHeart className=' cursor-pointer text-2xl sm:text-3xl' />
                <BsThreeDots className=' cursor-pointer text-xl sm:text-2xl' />
            </div>

            <div className='flex flex-col items-center justify-center w-full px-6 py-5'>
                <span className='flex items-center justify-center w-full'>
                    <span className='w-10'>#</span>
                    <span className='w-full text-left'>title</span>
                    <span className='w-12'><BiTime /></span>
                </span>
            </div>
        </>
    )

    // time formatter
    function convertSecondsToTime(seconds) {
        if (typeof seconds !== 'number' || isNaN(seconds)) {
          throw new Error('Input must be a valid number of seconds.');
        }
      
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
      
        return {
          hours: hours,
          minutes: minutes,
          seconds: remainingSeconds
        };
      }

    useEffect(() => {
        axios.get(`https://api.spotify.com/v1/albums/${id}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then((resp) => {
                const { name, type, images, label, tracks } = resp.data

                const trackData = tracks.items.map(({artists, duration_ms, name, preview_url}, index) => {
                    return (
                        <span key={index} className='flex mb-3 px-1.5 py-2.5 rounded-md cursor-pointer items-start justify-start  w-screen sm:w-full hover:bg-[#79124536]' 
                        onClick={() => setAudioUrl({
                            url: preview_url,
                            image: '',
                            name: name,
                            artists: artists,
                            play: 1
                          })}>
                            <span className='w-12 px-1.5 '>{index+1}</span>
                            <span className='flex gap-x-2.5 items-center justify-start w-full'>
                                <img className='h-12 hidden sm:h-16 sm:inline-block' src={image2} alt="error loading" />
                                <span className='flex text-left gap-y-1.5 flex-col items-start justify-center overflow-x-hidden sm:overflow-x-auto'>
                                    <h3 className='max-w-[10rem] w-full text-md textWraper sm:max-w-none'>{name}</h3>
                                    <h6 className='text-xs max-w-[10rem] textWraper sm:max-w-none'>
                                        {artists.map(({name}, num)=>{
                                            return(
                                                <span key={num} className='mr-1'>{name} ,</span>
                                            )
                                        })}
                                    </h6>
                                </span>
                            </span>
                            <span className='w-24 text-sm px-1.5 text-left'>{
                            convertSecondsToTime(duration_ms/1000).minutes}:
                            {parseInt(convertSecondsToTime(duration_ms/1000).seconds)} min
                            </span>
                        </span>
                    )
                })


                setDesc(
                    <>
                        <div className='flex items-center justify-center w-full px-6 py-5 sm:px-12' style={{ background: 'radial-gradient(#f54d69, transparent)' }}>
                            <span className='flex gap-x-5 items-center justify-start w-full sm:gap-x-8' >
                                <img className='h-24 sm:h-28 lg:h-36' src={images[0].url} alt="error loading" />
                                <span className='flex text-left font-semibold gap-y-0.5 flex-col items-start justify-center sm:gap-y-3.5'>
                                    <h4 className='italic text-xs sm:text-sm md:text-md lg:text-lg'>{type}</h4>
                                    <h1 className='text-md sm:text-3xl md:text-4xl lg:text-5xl'>{name}</h1>
                                    <h5 className='text-xs sm:text-md'>{label}</h5>
                                </span>
                            </span>
                        </div>

                        <div className='flex text-3xl gap-x-5 items-center justify-start w-full py-3.5 px-6 sm:px-12' style={{ background: `${colorPalette.tertiary}` }}>
                            <AiFillPlayCircle className='cursor-poitner text-3xl sm:text-5xl' />
                            <AiOutlineHeart className=' cursor-pointer text-2xl sm:text-3xl' />
                            <BsThreeDots className=' cursor-pointer text-xl sm:text-2xl' />
                        </div>

                        <div className='flex flex-col items-center justify-center w-full px-6 py-5'>
                            <span className='flex items-center justify-center w-full'>
                                <span className='w-10'>#</span>
                                <span className='w-full text-left'>title</span>
                                <span className='w-12'><BiTime /></span>
                            </span>
                            {trackData}
                        </div>
                    </>
                )
                
            })
            .catch((err) => {
                console.log(err)
            })
    }, [token, dispatch])



    return (
        <>
            <div className='flex modifiedScrollbar pb-16 mb-26 lg:mb-0 items-center justify-start flex-col overflow-y-scroll w-full h-full lg:max-h-[72vh]'>
                {desc}
                {/* <embed src="https://p.scdn.co/mp3-preview/a89463ed3d1100f2732b8961065219149e61841b?cid=6a9912a00dcb4fc38eb99b185db7dd17" type="" /> */}
            </div>
        </>
    )
}

export default Description