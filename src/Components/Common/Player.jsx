import React, { useContext, useRef, useState } from 'react'
import { colorPalette } from '../Utilities/ColorPalette'
import img1 from '../../Assets/Images/album3.jpg'
import { myContext } from '../Utilities/AudioContext'
import swal from 'sweetalert'

import { BiSkipPrevious, BiPlay, BiPause, BiSkipNext } from 'react-icons/bi'

function Player() {
    const { audioUrl, setAudioUrl } = useContext(myContext)
    const playPause = useRef(null)

    const handlePlayPause = ()=>{
        if(!audioUrl.play){
            playPause.current.play();
            setAudioUrl({
                ...audioUrl,
                play : 1,
            })
        }
        else{
            playPause.current.pause()
            setAudioUrl({
                ...audioUrl,
                play : 0
            })
        }
    }
    return (
        <>
            <div className={`flex z-20 absolute bottom-[4rem] rounded-b-3xl lg:bottom-0 h-24 pb-2.5 text-cyan-200 items-end justify-center w-full px-2.5 sm:px-6 md:px-8 lg:px-12`} style={{ background: `${colorPalette.secondary}` }}>
                <span className='flex gap-x-2.5 items-center justify-start w-full'>
                    <img className='h-12 hidden rounded-md sm:inline-block' src={img1} alt="error loading" />
                    <span className='flex text-left gap-y-0.5 flex-col items-start justify-center overflow-x-hidden sm:overflow-x-auto'>
                        <h3 className='max-w-[10rem] w-full text-md textWraper sm:max-w-none'>{audioUrl.name}</h3>
                        <h6 className='text-xs max-w-[10rem] textWraper sm:max-w-none'>
                            {audioUrl.artists.map(({ name }, num) => {
                                return (
                                    <span key={num} className='mr-1'>{name} ,</span>
                                )
                            })}
                        </h6>
                    </span>
                </span>

                <span className='flex items-center justify-center w-44 sm:w-80'>
                    {audioUrl.url != null ? <>
                        <audio className='w-44 hidden sm:w-80' controls autoPlay src={audioUrl.url} ref={playPause}></audio>
                        <span className='flex pb-1.5 text-2xl gap-x-1.5 items-center justify-center'>
                            <BiSkipPrevious />
                            {audioUrl.play ?
                                <BiPause onClick={()=> handlePlayPause()} className={`text-[#09092b] text-4xl`} />
                                :
                                <BiPlay onClick={()=> handlePlayPause()} className={`text-[#09092b] text-4xl`} />}
                            <BiSkipNext />
                        </span>
                    </>
                        :
                        <span className='flex flex-col items-center pt-2 justify-center'>
                            <span className='flex pb-1.5 text-2xl gap-x-1.5 items-center justify-center'>
                                <BiSkipPrevious />
                                {audioUrl.url != null ?
                                    <BiPause className={`text-[#09092b] text-4xl`} />
                                    :
                                    <BiPlay className={`text-[#09092b] text-4xl`} />}
                                <BiSkipNext />
                            </span>
                            <span className='text-xs top-3 text-[#09092b]'>Not available</span>
                        </span>}
                </span>
            </div>
        </>
    )
}

export default Player