import axios from 'axios';
import React from 'react'
import { credentials } from '../Components/Utilities/Credentials';

import logo from '../Assets/Images/spotify logo.png'

function SignIn() {
  const authentication = () => {
    const client_id = `${credentials.clientId}`;
    const redirectUrl = 'https://playtunes-connect-to-spotify.vercel.app/home';
    const apiUrl = 'https://accounts.spotify.com/authorize';
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-read-playback-position",
      "user-top-read",
      "user-library-read"
    ];

    window.location.href = `${apiUrl}?client_id=${client_id}&redirect_uri=${redirectUrl}&scope=${scope.join("  ")}&response_type=token&show_dialog=true`
  }

  return (
    <>
      <section className='flex flex-col gap-y-3.5 items-center justify-center h-screen w-screen bg-black'>
        <img className='h-28' src={logo} alt="error loading" />
        <button className='rounded-full px-3.5 py-1.5 bg-green-500 text-black font-semibold' onClick={authentication}>Connect to spotify</button>
      </section>
    </>
  )
}

export default SignIn