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
import ArtistDescription from '../Home/ArtistDescription'
import { myContext } from '../Utilities/AudioContext'

function RelatedArtists(props) {
    const {audioUrl, component, forwardStack, backwardStack, setComponent, setAudioUrl, setBackwardStack, setForwardStack} = useContext(myContext)
    const {id} = props
    const [{ token }, dispatch] = useStateProvider();
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9.10]

    const [severalAlbums, setSeveralAlbums] = useState(data.map((ele, index) => {
        return (
            <span key={index} className='card cursor-pointer flex gap-y-1 flex-col items-start justify-center w-32'>
                <img className='w-32 h-32 rounded-lg' src={album1} alt="error loading" />
                <h2 className='text-sm text-left font-semibold'>Freaking me out</h2>
                <h4 className='text-xs text-left italic font-semibold text-gray-500'>Alen Matyr</h4>
            </span>
        )
    }))

    const handleChange = (id)=>{
        while(forwardStack.length > 0){
            forwardStack.pop();
        }

        setComponent(<ArtistDescription id={id} />)
        backwardStack.push(component)
    }


    useEffect(() => {
        // Several Albums
        axios.get(`https://api.spotify.com/v1/artists/${id}/related-artists`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then((resp) => {
                console.log(resp)
                // resp.data.albums.map(({ name, type }, index) => {
                    setSeveralAlbums(
                        resp.data.artists.map((ele, index) => {
                            return (
                                <span key={index} className='card w-40 text-left flex cursor-pointer gap-y-1 flex-col items-center justify-center p-2.5 rounded-md' onClick={() => handleChange(ele.id)}>
                                    <img className='w-36 sm:w-40 sm:h-32 rounded-lg' src={ele.images[parseInt(Math.random() * 10) % 3].url} alt="error loading" />
                                    <h2 className='text-sm w-full text-left font-semibold'>{ele.name}</h2>
                                    <h4 className='text-xs w-full text-left italic font-semibold text-gray-500'>{ele.type}</h4>
                                </span>
                            )
                        })
                    )
                // })
            })
            .catch((err) => {
                console.log(err)
            })
    }, [token, dispatch, id])

    return (
        <div className='flex gap-y-5 flex-col text-cyan-200 w-full max-w-full items-center justify-center px-3 lg:px-12 py-8'>
            <span className='flex items-center justify-between w-full'>
                <h1 className='font-semibold text-xl'>Related Artists</h1>
            </span>

            <span className='hideScrollbar flex items-center justify-start w-full overflow-x-scroll'>
                <span className='flex items-start justify-center gap-x-5'>
                    {severalAlbums}
                </span>
            </span>
        </div>
    )
}

export default RelatedArtists