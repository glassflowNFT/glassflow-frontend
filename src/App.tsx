import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home/Home';
import Verification from './pages/Verification/Verification';
import { useNavigate } from 'react-router';
import cookie from 'react-cookies';

function App() {
  const navigate = useNavigate();

  const handleNavigation = () => {

    // load age verification cookie
    const verificationCookie = cookie.load('age-verified');

    // check if cookie exists
    if (!verificationCookie) {
      // setup cookie expiration
      const expires = new Date();
      expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14);
      // save cookie
      cookie.save(
        'age-verified',
        'true',
        {
          expires
        }
      );
      // navigate to the verify page on initial visit
      navigate("/verify");
    }

  }

  useEffect(() => {
    handleNavigation();
  }, []);

  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/verify" element={<Verification/>} />
        </Routes>
      </div>
  );
}

export default App;
