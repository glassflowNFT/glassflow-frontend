import './verification.css';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export default function Verification() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");


  const buttonClicked = () => {
    // get date picker and value
    const datePicker = document.querySelector("input.date-picker") as HTMLInputElement;
    const birthday = new Date(datePicker.value);

    // calculate number of years that have passed
    const now = new Date();
    let diff = (now.getTime() - birthday.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    let yearDiff = Math.abs(Math.round(diff/365.25));

    // is the user older than 21 years old
    if (yearDiff >= 21) {
      navigate("/")
    } else {
      setError("You are not old enough to access GlassFlow")
    }
  }

  return(
    <div className="verification-wrapper">
      <section className="container">
        <span className="header">GlassFlow</span>
        <span>What year were you born?</span>
        <input type="date" className="date-picker" name="date"></input> 
        <button onClick={buttonClicked}>ENTER</button>
        <span className="error">{error}</span>
        <span className="notice secondary">By accessing this site, you agree to GlassFlow’s <a href="/">Terms of Use</a> and <a href="/">Privacy Policy</a></span>
      </section>
    </div>
  );
}