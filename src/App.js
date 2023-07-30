import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import { useEffect } from 'react';
import { useStateProvider } from './Components/Utilities/StateProvider';
import reducer from './Components/Utilities/Reducer';
import { reducerCases } from './Components/Utilities/Constant';

function App() {
  const [{token}, dispatch] = useStateProvider();
  useEffect(()=> {
    const hash = window.location.hash;
    if(hash){
      const token = hash.substring(1).split("&")[0].split("=")[1];
      dispatch({type: reducerCases.SET_TOKEN, token});
    }
  },[token, dispatch])

  console.log('main token ', token)

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />}></Route>
        <Route path='/signUp' element={<SignUp />}></Route>
        <Route path='/home' element={<Home />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
