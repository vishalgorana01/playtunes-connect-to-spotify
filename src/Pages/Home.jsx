import React, { useEffect, useState } from 'react'
import { colorPalette } from '../Components/Utilities/ColorPalette'
import ControllerSidebar from '../Components/Sidebar/ControllerSidebar'
import Navbar from '../Components/Common/Navbar'
import Explore from '../Components/Home/Explore'
import Player from '../Components/Common/Player'
import axios from 'axios'
import { useStateProvider } from '../Components/Utilities/StateProvider'

function Home() {
  const [{token}, dispatch] = useStateProvider()
  const [musicComponents, setMusicComponents] = useState(null)
  useEffect(() => {
    axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: 'Bearer '+ token
      }
    })
    .then((resp)=>{
      console.log("--->",resp)
    })
    .catch((err)=>{
      console.log(err)
    })

    setMusicComponents(<Explore setDescription={setMusicComponents} />)
  }, [token, dispatch])

  return (
    <>
      <section className='relative flex flex-col items-center justify-center w-screen py-0 lg:py-6' style={{ backgroundColor: `${colorPalette.primary}`, minHeight: '100vh' }}>
        <span className='fixed z-0 top-0 left-0 w-screen h-1/2' style={{ backgroundColor: `${colorPalette.secondary}`, borderBottomLeftRadius: '2.5rem', borderBottomRightRadius: '2.5rem' }}></span>

        <div className='flex relative items-start bg-[#080725] justify-center h-screen w-full max-w-7xl overflow-hidden lg:h-fit lg:rounded-3xl'>
          <ControllerSidebar setMusicComponents={setMusicComponents} />

          <div className='relative text-gray-50 flex flex-col items-center justify-start h-full w-full lg:max-w-[80%]'>
          <span className='absolute z-[21] h-16 w-full bg-[#080725] top-16 lg:hidden' style={{ borderTopLeftRadius: '2rem', borderTopRightRadius: '2rem' }}></span>
            <Navbar />
            {musicComponents}
          </div>
          <span className='absolute z-[21] h-[2.5rem] w-full bg-[#080725] bottom-32 lg:bottom-16' style={{ borderBottomLeftRadius: '2rem', borderBottomRightRadius: '2rem' }}></span>
          <Player />
        </div>

      </section>
    </>
  )
}

export default Home
