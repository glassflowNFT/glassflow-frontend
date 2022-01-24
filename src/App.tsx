import React, { useEffect, useState } from 'react';
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
import Footer from './components/Footer/Footer';
import UserAuth from './components/UserAuth/UserAuth';

function App() {
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState<boolean>(false);

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
        <Nav setShowAuth={setShowAuth}/>
        {showAuth && <UserAuth showAuth={showAuth} setShowAuth={setShowAuth}/>}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/mint" element={<Mint/>} />
          <Route path="/user" element={<User/>} />
          <Route path="/support" element={<Support/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/verify" element={<Verification/>} />
        </Routes>
        <Footer/>
      </div>
  );
}

export default App;
