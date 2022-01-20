import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home/Home';
import Verification from './pages/Verification/Verification';
import { useNavigate } from 'react-router';
import cookie from 'react-cookies';
import Nav from './components/Nav/Nav';
import Mint from './pages/Mint/Mint';
import User from './pages/User/User';
import Support from './pages/Support/Support';
import Search from './pages/Search/Search';

function App() {
  const navigate = useNavigate();

  const handleNavigation = () => {

    // load age verification cookie
    const verificationCookie = cookie.load('age-verified');

    // check if cookie exists
    if (!verificationCookie) {
      // navigate to the verify page on initial visit
      navigate("/verify");
    }

  }

  useEffect(() => {
    handleNavigation();
    // eslint-disable-next-line
  }, []);

  return (
      <div className="App">
        <Nav/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/mint" element={<Mint/>} />
          <Route path="/user" element={<User/>} />
          <Route path="/support" element={<Support/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/verify" element={<Verification/>} />
        </Routes>
      </div>
  );
}

export default App;
