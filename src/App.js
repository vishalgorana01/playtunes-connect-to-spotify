import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import { useEffect, useState } from 'react';
import { useStateProvider } from './Components/Utilities/StateProvider';
import reducer from './Components/Utilities/Reducer';
import { reducerCases } from './Components/Utilities/Constant';
import { createContext } from 'react';
import { myContext } from './Components/Utilities/AudioContext';
import Explore from './Components/Home/Explore';

function App() {
  const [audioUrl, setAudioUrl] = useState({
    url: "https://p.scdn.co/mp3-preview/efe26a71014aa666c612d4b1fd6afed5b7d9bd79?cid=6a9912a00dcb4fc38eb99b185db7dd17",
    image: '',
    name: 'Ek din pyaar - Tadipar',
    artists: ['MC STAN'],
    play: 0
  })

  const [component, setComponent] = useState(<Explore />)

  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      dispatch({ type: reducerCases.SET_TOKEN, token });
    }
  }, [token, dispatch])

  console.log('main token ', token)

  return (
    <div className="App">
      <myContext.Provider value={{audioUrl, component, setComponent, setAudioUrl}}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<SignIn />}></Route>
            <Route path='/signUp' element={<SignUp />}></Route>
            <Route path='/home' element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
      </myContext.Provider>
    </div>
  );
}

export default App;
