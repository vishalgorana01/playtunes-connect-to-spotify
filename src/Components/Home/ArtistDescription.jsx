import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useStateProvider } from '../Utilities/StateProvider'
import RelatedArtists from  '../../Components/Common/RelatedArtists'

import image1 from '../../Assets/Images/album1.jpg'
import image2 from '../../Assets/Images/album2.jpg'

import '../../Assets/CSS/global.css'

// react-icons
import { AiFillPlayCircle, AiOutlineHeart } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import { BiTime } from 'react-icons/bi'
import { colorPalette } from '../Utilities/ColorPalette'
import { myContext } from '../Utilities/AudioContext'


function ArtistDescription(props) {
    const {audioUrl, setAudioUrl} = useContext(myContext)
    const [{ token }, dispatch] = useStateProvider()
    const { id } = props

    const [ArtistDetails, setArtistDetails] = useState(
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
    )


    const [artistsTopTracks, setArtistTopTracks] = useState(
        <div className='flex flex-col items-center justify-center w-full px-6 py-5'>
            <span className='flex items-center justify-center w-full'>
                <span className='w-10'>#</span>
                <span className='w-full text-left'>title</span>
                <span className='w-12'><BiTime /></span>
            </span>
        </div>
    )

    const [desc, setDesc] = useState(
        <>
            <div className='flex text-3xl gap-x-5 items-center justify-start w-full py-3.5 px-6 sm:px-12' style={{ background: `${colorPalette.tertiary}` }}>
                <AiFillPlayCircle className='cursor-poitner text-3xl sm:text-5xl' />
                <button className='text-lg py-1 px-5 cursor-pointer rounded-full hover:bg-[#79124536]' style={{ border: '2px solid white' }}>follow</button>
                <BsThreeDots className=' cursor-pointer text-xl sm:text-2xl' />
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
        axios.get(`https://api.spotify.com/v1/artists/${id}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then((resp) => {
                console.log(resp)
                const { name, type, images, followers } = resp.data

                setArtistDetails(
                    <div className='relative flex items-center overflow-hidden justify-center w-full h-[160px] sm:h-[280px] px-8 py-32 md:py-44 sm:py-32 lg:py-48 sm:px-12 lg:h-[320px]' style={{ background: 'radial-gradient(#f54d69, transparent)' }}>
                        <img className={`absolute opacity-50 z-0 w-full h-auto object-cover object-top -top-16 sm:-top-40 md:-top-52 lg:-top-60`} src={images[0].url} alt="error loading" />
                        <span className='flex relative gap-x-5 items-center justify-start w-full sm:gap-x-8' >
                            <span className='z-10 flex text-left font-semibold gap-y-1.5 flex-col items-start justify-center sm:gap-y-3.5'>
                                <h1 className='text-xl sm:text-3xl md:text-4xl lg:text-5xl'>{name}</h1>
                                <h5 className='text-xs sm:text-lg'>{type}</h5>
                                <h5 className='text-xs sm:text-lg'>{followers.total} followers</h5>
                            </span>
                        </span>
                    </div>
                )

                // top-tracks of artists
                axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=IN`, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                })
                    .then((resp) => {
                        const trackData = resp.data.tracks.map(({ artists, duration_ms, name, preview_url}, index) => {
                            return (
                                <span key={index} className='flex mb-3 px-1.5 py-2.5 rounded-md cursor-pointer items-start justify-start  w-screen sm:w-full hover:bg-[#79124536]' 
                                onClick={() => setAudioUrl({
                                    url: preview_url,
                                    image: '',
                                    name: name,
                                    artists: artists,
                                    play: 1
                                  })}>
                                    <span className='w-12 px-1.5 '>{index + 1}</span>
                                    <span className='flex gap-x-2.5 items-center justify-start w-full'>
                                        <img className='h-12 hidden sm:h-16 sm:inline-block' src={image2} alt="error loading" />
                                        <span className='flex text-left gap-y-1.5 flex-col items-start justify-center overflow-x-hidden sm:overflow-x-auto'>
                                            <h3 className='max-w-[10rem] w-full text-md textWraper md:max-w-sm lg:max-w-xl'>{name}</h3>
                                            <h6 className='text-xs max-w-[10rem] textWraper md:max-w-sm lg:max-w-xl'>
                                                {artists.map(({ name }, num) => {
                                                    return (
                                                        <span key={num} className='mr-1'>{name} ,</span>
                                                    )
                                                })}
                                            </h6>
                                        </span>
                                    </span>
                                    <span className='w-24 text-sm px-1.5 text-left'>{
                                        convertSecondsToTime(duration_ms / 1000).minutes}:
                                        {parseInt(convertSecondsToTime(duration_ms / 1000).seconds)} min
                                    </span>
                                </span>
                            )
                        })

                        setArtistTopTracks(
                            <div className='flex flex-col pb-20 lg:pb-0 items-center justify-center w-full px-6 py-5'>
                                <span className='flex items-center justify-center w-full'>
                                    <span className='w-10'>#</span>
                                    <span className='w-full text-left'>title</span>
                                    <span className='w-12'><BiTime /></span>
                                </span>
                                {trackData}
                            </div>
                        )
                    })
                    .catch((err) => {
                        console.log(err)
                    })

            })
            .catch((err) => {
                console.log(err)
            })
    }, [token, dispatch, id])

    return (
        <>
            <div className='modifiedScrollbar pb-40 flex mb-26 lg:mb-0 items-center justify-start flex-col overflow-y-scroll w-full h-full lg:max-h-[600px]'>
                {ArtistDetails}
                {desc}
                {artistsTopTracks}
                {/* {relatedAtrtists} */}
                <RelatedArtists id={id} />
                {/* <embed src="https://p.scdn.co/mp3-preview/a89463ed3d1100f2732b8961065219149e61841b?cid=6a9912a00dcb4fc38eb99b185db7dd17" type="" /> */}
            </div>
        </>
    )
}

export default ArtistDescription
