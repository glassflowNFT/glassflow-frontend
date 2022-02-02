import './verification.css';
// import { useNavigate } from 'react-router';
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import cookie from 'react-cookies';

export default function Verification() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");


  const buttonClicked = (e: any) => {
    const text = e.target.innerHTML.toLowerCase();
    if (text === "yes") {
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
      // navigate("/");
      navigate("/")
    } else {
      setError("You muse be 21+ to access GlassFlow");
    }
  }

  return(
    <div className="verification-wrapper">
      <section className="container fadeInLonger">
        <span className="header">GlassFlow</span>
        <span>Are you 21 years or older?</span>
        <div className="verification-button-wrapper">
          <button onClick={buttonClicked}>Yes</button>
          <button onClick={buttonClicked}>No</button>
        </div>
        <span className="error">{error}</span>
        <span className="notice secondary">By accessing this site, you agree to GlassFlow’s <a href="/">Terms of Use</a> and <a href="/">Privacy Policy</a></span>
      </section>
    </div>
  );
}