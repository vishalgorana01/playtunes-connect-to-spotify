import React, { useContext, useEffect, useState } from 'react'
import { colorPalette } from '../Utilities/ColorPalette'
// react icons
import { FiHome, FiSearch } from 'react-icons/fi'
import { VscLibrary } from 'react-icons/vsc'
import { BsPlusSquare } from 'react-icons/bs'
import { BiUser } from 'react-icons/bi'
import Explore from '../Home/Explore'
import Search from '../Home/Search'
import Playlists from '../Home/Playlists'
import Library from '../YourLibrary/Library'
import { myContext } from '../Utilities/AudioContext'

function ControllerSidebar(props) {
    const { setMusicComponents } = props
    const { audioUrl, component, forwardStack, backwardStack, setComponent, setAudioUrl, setBackwardStack, setForwardStack} = useContext(myContext)
    const [active, setActive] = useState({
        home: true,
        search: false,
        yourLibrary: false,
        profile: false,
    })

    const handleChange = (given) => {
        if (given == 'home') {
            while(forwardStack.length > 0){
                forwardStack.pop();
            }
            setComponent(<Explore />)
            backwardStack.push(component)

            setActive({
                home: true,
                search: false,
                yourLibrary: false,
                profile: false
            })
        }
        else if (given == 'search') {
            while(forwardStack.length > 0){
                forwardStack.pop();
            }
            setComponent(<Search />)
            backwardStack.push(component)

            setActive({
                home: false,
                search: true,
                yourLibrary: false,
                profile: false
            })
        }
        else if (given == 'yourLibrary') {
            while(forwardStack.length > 0){
                forwardStack.pop();
            }
            setComponent(<Library />)
            backwardStack.push(component)

            setActive({
                home: false,
                search: false,
                yourLibrary: true,
                profile: false
            })
        }
        else if (given == 'profile') {
            // setComponent(<Library />)

            setActive({
                home: false,
                search: false,
                yourLibrary: false,
                profile: true
            })
        }
    }

    useEffect(() => {
        setActive({
            explore: true,
            albums: false,
            artists: false,
            playlists: false
        })
    }, [])
    return (
        <div className='absolute w-full h-20 z-20 lg:z-30 bottom-0 flex flex-col gap-y-10 items-center py-5 px-6 text-cyan-200 justify-center lg:justify-start lg:w-96 lg:h-[48rem] lg:relative' style={{ backgroundColor: `${colorPalette.tertiary}`, zIndex: '2' }}>
            <div className='hidden w-full text-pink-600 text-xl font-sans font-semibold text-left lg:inline-block '>Playtunes</div>

            <div className='flex flex-row text-left items-start text-sm gap-y-2.5 justify-between w-full lg:flex-col lg:justify-center'>
                <span className={`${active.explore ? 'text-pink-500' : ''} flex items-center justify-center cursor-pointer duration-300 hover:text-pink-500`} onClick={(ele) => handleChange('home')}>
                    <FiHome className='text-2xl mr-2' />
                    <span className='hidden sm:inline-block'>Home</span>
                </span>
                <span className={`${active.albums ? 'text-pink-500' : ''} flex items-center justify-center cursor-pointer duration-300 hover:text-pink-500`} onClick={() => handleChange('search')}>
                    <FiSearch className='text-2xl mr-2' />
                    <span className='hidden sm:inline-block'>Search</span>
                </span>
                <span className={`${active.albums ? 'text-pink-500' : ''} flex items-center justify-center cursor-pointer duration-300 lg:hidden hover:text-pink-500`} onClick={() => handleChange('yourLibrary')}>
                    <VscLibrary className='text-2xl mr-2' />
                    <span className='hidden sm:inline-block'>Your libray</span>
                </span>
                <span className={`${active.albums ? 'text-pink-500' : ''} flex items-center justify-center cursor-pointer duration-300 lg:hidden hover:text-pink-500`} onClick={() => handleChange('profile')}>
                    <BiUser className='text-2xl mr-2' />
                    <span className='hidden sm:inline-block'>Profile</span>
                </span>
            </div>

            <div className='hidden flex-col text-left items-start text-sm gap-y-2.5 justify-center w-full lg:flex'>
                <span className='flex items-center justify-between w-full'>
                    <span className='flex items-center justify-center cursor-pointer duration-300 hover:text-pink-500'>
                        <VscLibrary className='text-2xl mr-2' />Your library
                    </span>

                    <span>
                        <BsPlusSquare />
                    </span>
                </span>

                <Playlists setDescription={setMusicComponents} />
            </div>

            {/* <div className='flex flex-col items-start text-sm gap-y-2.5 justify-center w-full'>
                <h1 className='text-md tracking-wider mb-3.5 text-pink-400'>Activity</h1>
                <button className='flex cursor-pointer items-center justify-center px-3 py-1.5 rounded-md bg-pink-500 hover:bg-pink-400'>create room</button>
            </div> */}

            {/* psuedo element */}
            <span className='hidden lg:inline-block absolute z-30 h-[2.5rem] w-full bg-[#09092b] bottom-32 lg:bottom-16' style={{borderBottomLeftRadius: '2rem'}}></span>
        </div>
    )
}

export default ControllerSidebar