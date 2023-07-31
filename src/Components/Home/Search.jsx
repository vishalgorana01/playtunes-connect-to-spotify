import React, { useEffect, useState } from 'react'
import { useStateProvider } from '../Utilities/StateProvider'

import '../../Assets/CSS/global.css'

import album1 from '../../Assets/Images/album1.jpg'
import axios from 'axios';

function Search() {
  const [{ token }, dispatch] = useStateProvider();

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9.10]

  const randomColors = ['#E13300', '#7358FF', '#1E3264', '#E8115B', '#E91429', '#A56752', '#8D67AB', '#148A08', '#537AA1', '#148A08']

  const [categories, setCategories] = useState(data.map((ele, index) => {
    return (
      <span key={index} className='relative w-full h-16 sm:h-56 md:h-56 lg:h-52 xl:h-48 rounded-md overflow-hidden' style={{ backgroundColor: `${randomColors[index % (randomColors.length)]}` }}>
        <img className='hidden sm:flex h-32 w-32 rotate-45 absolute rounded-sm sm:rounded-md -right-5 -bottom-5' src={album1} alt="error loading" />
        <h3 className='absolute top-3.5 left-2.5 text-md sm:text-3xl'>Telugu</h3>
      </span>
    )
  }))

  useEffect(() => {
    axios.get('https://api.spotify.com/v1/browse/categories', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then((resp) => {
        const { items } = resp.data.categories

        setCategories(items.map((ele, index) => {
          return (
            <span key={index} className='relative w-full h-16 sm:h-56 md:h-56 lg:h-52 xl:h-48 rounded-md overflow-hidden' style={{ backgroundColor: `${randomColors[index % (randomColors.length)]}` }}>
              <img className='hidden sm:flex h-32 w-32 rotate-45 absolute rounded-sm sm:rounded-md -right-5 -bottom-5' src={ele.icons[0].url} alt="error loading" />
              <h3 className='absolute top-3.5 left-2.5 text-md sm:text-3xl'>{ele.name}</h3>
            </span>
          )
        }))

        axios.get('https://api.spotify.com/v1/browse/categories/toplists?country=iN', {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
          .then((resp) => {
            console.log(resp)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }, [token, dispatch])

  return (
    <div className='modifiedScrollbar pb-32 pt-6 lg:py-0 flex mb-16 flex-col gap-y-8 items-center justify-start w-full px-2 sm:px-6 lg:px-12 overflow-y-scroll lg:max-h-[600px]'>
      <h1 className='text-left w-full font-semibold text-xl'>Browse all</h1>

      <div className='grid grid-cols-2 gap-3.5 w-full md:grid-cols-3 xl:grid-cols-4'>
        {categories}
      </div>
    </div>
  )
}

export default Search