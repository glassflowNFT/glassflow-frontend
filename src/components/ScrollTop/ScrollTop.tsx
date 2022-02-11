import { animateScroll as scroll } from 'react-scroll';
import { useEffect, useState } from 'react';
import { ArrowUp } from 'react-feather';
import './scrollTop.css';

export default function ScrollTop() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // update if the scroll button is visible after users scrolls 
    // some distance
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  });

  const onScroll = () => {
    console.log(window.scrollY)
    setIsVisible(window.scrollY > 100);
  }

  const scrollButtonClicked = () => {
    scroll.scrollTo(0);
  }

  return (
    <button
      onClick={scrollButtonClicked}
      className={`scroll-top-button ${isVisible ? '' : 'hidden'}`}
      style={{

      }}
    >
      <ArrowUp/>
    </button>
  );
}