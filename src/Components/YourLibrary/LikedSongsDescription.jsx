import React, { useEffect, useState } from 'react'

import image1 from '../../Assets/Images/album2.jpg'

// react-icons
import { AiFillPlayCircle, AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import { BiTime } from 'react-icons/bi'
import { colorPalette } from '../Utilities/ColorPalette'
import axios from 'axios'
import { useStateProvider } from '../Utilities/StateProvider'

function LikedSongsDescription() {
  const [{ token }, dispatch] = useStateProvider()
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
    axios.get("https://api.spotify.com/v1/me/tracks", {
      headers: {
        Authorization: 'Bearer ' + token,
        "Content-Type": "application/json"
      }
    })
      .then((resp) => {
        // console.log(resp.data)

        const trackData = resp.data.items.map(({ track, duration_ms, name }, index) => {
          return (
            <span key={index} className='flex mb-3 px-1.5 py-2.5 rounded-md cursor-pointer items-start justify-start  w-screen sm:w-full hover:bg-[#79124536]'>
              <span className='w-12 px-1.5 '>{index + 1}</span>
              <span className='flex gap-x-2.5 items-center justify-start w-full'>
                <img className='h-12 hidden sm:h-16 sm:inline-block' src={image1} alt="error loading" />
                <span className='flex text-left gap-y-1.5 flex-col items-start justify-center overflow-x-hidden sm:overflow-x-auto'>
                  <h3 className='max-w-[10rem] w-full text-md textWraper sm:max-w-none'>{track.name}</h3>
                  <h6 className='text-xs max-w-[10rem] textWraper sm:max-w-none'>
                    {track.artists.map(({ name }, num) => {
                      return (
                        <span key={num} className='mr-1'>{name} ,</span>
                      )
                    })}
                  </h6>
                </span>
              </span>
              <span className='w-24 text-sm px-1.5 text-left'>{
                convertSecondsToTime(track.duration_ms / 1000).minutes}:
                {parseInt(convertSecondsToTime(track.duration_ms / 1000).seconds)} min
              </span>
            </span>
          )
        })

        setDesc(
          <>
            <div className='flex items-center justify-center w-full px-6 py-5 sm:px-12' style={{ background: 'radial-gradient(#f54d69, transparent)' }}>
              <span className='flex gap-x-5 items-center justify-start w-full sm:gap-x-8' >
                <span className='flex items-center justify-center likedSongsBg h-12 w-16 sm:h-28 sm:w-32' alt="error loading" >
                  <AiFillHeart className='text-2xl' />
                </span>
                <span className='flex text-left font-semibold gap-y-0.5 flex-col items-start justify-center sm:gap-y-3.5'>
                  <h4 className='italic text-xs sm:text-sm md:text-md lg:text-lg'>playlist</h4>
                  <h1 className='text-md sm:text-3xl md:text-4xl lg:text-5xl'>liked songs</h1>
                  {/* <h5 className='text-xs sm:text-md'></h5> */}
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
    <div className='flex pb-20 mb-26 items-center justify-start flex-col overflow-y-scroll w-full h-full lg:max-h-[72vh]'>
      {desc}
    </div>
  )
}

export default LikedSongsDescription