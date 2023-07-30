import React, { useEffect, useState } from 'react'

// react icons
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { MdArrowForwardIos } from 'react-icons/md'
import { BsSearch } from 'react-icons/bs'
import { MdOutlineNotificationsNone } from 'react-icons/md'
import { AiTwotoneSetting } from 'react-icons/ai'
import { useStateProvider } from '../Utilities/StateProvider'
import axios from 'axios'

function Navbar() {
  const [{ token }, dispatch] = useStateProvider();
  const [search, setSearch] = useState('')

  const [profile, setProfile] = useState({
    displayName: 'Guest',
    img: null,
    firstLetter: ''
  })

  useEffect(()=>{
    axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer '+token
      }
    })
    .then((resp)=>{
      console.log(resp)

      setProfile({
        displayName: resp.data.display_name,
        firstLetter: resp.data.display_name.toString()[0]
      })
    })
    .catch((err)=>{
      console.log(err)
    })
  }, [token, dispatch])

  return (
    <div className='flex text-cyan-200 gap-x-7 items-center justify-between w-full py-3.5 px-2.5 lg:px-12 bg-[#06061f]'>
      <span className='flex items-center justify-center gap-x-0.5 text-xl'><MdOutlineArrowBackIosNew className='cursor-pointer' /> <MdArrowForwardIos className='cursor-pointer' /></span>

      <label htmlFor="" className='flex items-center justify-center gap-y-2.5 w-full bg-[#19183e] py-1.5 px-3 rounded-md'>
        <BsSearch className='text-xl mr-2' />
        <input type="text" value={search} onChange={(ele) => setSearch(ele.currentTarget.value)} placeholder='search for music, artists, etc' className='bg-transparent outline-none border-none w-full' />
      </label>

      <span><MdOutlineNotificationsNone className='text-2xl' /></span>

      <span className='flex gap-x-1.5 items-center justify-center'>
        <span className='text-lg hidden h-10 w-10 border-2 border-pink-400 bg-black items-center justify-center px-2 rounded-full lg:flex'>
          {profile.firstLetter}
        </span>
        <span className='text-sm hidden lg:inline-block'>{profile.displayName}</span>
        <span><AiTwotoneSetting className='text-3xl ml-1.5 cursor-pointer' /></span>
      </span>
    </div>
  )
}

export default Navbar