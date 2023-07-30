import React, { useEffect, useState } from 'react'
import album3 from '../../Assets/Images/album1.jpg'
import { useStateProvider } from '../Utilities/StateProvider'
import axios from 'axios';

import { AiFillHeart } from 'react-icons/ai'
import { FiPlus } from 'react-icons/fi'
import LikedSongsDescription from '../YourLibrary/LikedSongsDescription';
import { setMusicComponents } from '../../Pages/Home';

function Playlists(props) {
  const { setDescription } = props
  const [{ token }, dispatch] = useStateProvider();

  const [songsLength, setSongsLength] = useState(0)

  const handleChange = (given) => {
    if (given == 'likedSongs') {
      console.log(given)
      setDescription(<LikedSongsDescription />)
    }
    else {

    }
  }

  useEffect(() => {
    axios.get('https://api.spotify.com/v1/me/tracks', {

      headers: {
        'Authorization': "Bearer " + token,
        "Content-Type": "application/json"
      }
    })
      .then((resp) => {
        // console.log("--> ",resp)

        setSongsLength(resp.data.items.length)
      })
      .catch((err) => {
        console.log(err)
      })

  }, [token, dispatch])



  return (
    <>
      <div className='relative flex-col flex gap-8 items-center justify-start h-40 w-full lg:h-full'>
        <span className='flex flex-col cursor-pointer px-2 rounded-sm gap-x-2 items-start justify-start h-full w-full py-1.5 hover:bg-[#79124536] lg:flex-row' onClick={() => handleChange('likedSongs')}>
          <span className='flex flex-col items-center justify-center likedSongsBg h-full w-full lg:h-12 lg:w-16 lg:flex-row' alt="error loading" >
            <AiFillHeart className='text-2xl' />
          </span>
          <span className='text-left font-semibold flex flex-col items-start justify-center w-full'>
            <h3 className='text-sm'>Liked songs</h3>
            <h4 className='text-xs'>{songsLength} songs</h4>
          </span>
        </span>
      </div>

      {/* <div className='relative flex-col flex gap-8 items-center justify-start h-40 w-full'>
        <span className='flex flex-col cursor-pointer px-2 rounded-sm gap-x-2 items-start justify-start h-full w-full py-1.5 hover:bg-[#79124536] lg:flex-row' onClick={()=>handleChange('likedSongs')}>
          <span className='flex flex-col items-center justify-center likedSongsBg h-full w-full lg:h-12 lg:w-16 lg:flex-row' alt="error loading" >
            <AiFillHeart className='text-2xl'/>
          </span>
          <span className='text-left font-semibold flex flex-col items-start justify-center w-full'>
            <h3 className='text-sm'>Liked songs</h3>
            <h4 className='text-xs'>{songsLength} songs</h4>
          </span>
        </span>
      </div> */}

      <div className='relative flex-col flex gap-8 items-center justify-start py-3.5 px-1.5 h-40 w-full lg:hidden' >
        <span className='w-full flex items-center justify-center flex-col rounded-md py-5' style={{ border: '2px solid white' }}>
          <FiPlus className='text-3xl' />
          <span className='w-full'>create playlist</span>
        </span>
      </div>
    </>
  )
}

export default Playlists