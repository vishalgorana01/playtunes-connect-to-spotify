import React, { useEffect, useState } from 'react'
import { colorPalette } from '../Components/Utilities/ColorPalette'
import ControllerSidebar from '../Components/Sidebar/ControllerSidebar'
import Navbar from '../Components/Common/Navbar'
import Explore from '../Components/Home/Explore'

function Home() {
   const [musicComponents, setMusicComponents] = useState(null)
    useEffect(()=> {
        setMusicComponents(<Explore setDescription={setMusicComponents}/>)
    },[])

  return (
    <>
    <section className='relative flex items-center justify-center w-screen py-0 lg:py-12' style={{backgroundColor: `${colorPalette.primary}`, minHeight: '100vh'}}>
        <span className='fixed z-0 top-0 left-0 w-screen h-1/2' style={{backgroundColor: `${colorPalette.secondary}`,  borderBottomLeftRadius: '2.5rem', borderBottomRightRadius: '2.5rem'}}></span>

        <div className='flex z-10 items-start bg-[#080725] justify-center h-screen w-full max-w-7xl overflow-hidden lg:h-fit lg:rounded-3xl'>
            <ControllerSidebar setMusicComponents={setMusicComponents} />

            <div className='relative text-gray-50 flex flex-col items-center justify-start h-full w-full lg:max-w-[80%]'>
                <Navbar />
                {musicComponents}
            </div>
        </div>
    </section>
    </>
  )
}

export default Home
