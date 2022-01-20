import { useEffect, useState } from 'react';
import { Home, PlusCircle, User, HelpCircle, Search } from 'react-feather';
import { Link } from "react-router-dom";
import "./nav.css"

export default function Nav() {
  const [currentPage, setCurrentPage] = useState<string>();

  useEffect(() => {
    // set current page when user first navigates to site
    const path = window.location.pathname;
    let page = path.substring(1);
    if (page === "") page = "home";
    setCurrentPage(page);
  }, []);

  const linkClicked = (e: any) => {
    const tagName = e.target.tagName.toLowerCase();
    // get the link element
    let el = e.target;
    if (tagName === 'svg') 
      el = e.target.parentNode;
    else if (e.target.parentNode.tagName === 'svg')
      el = e.target.parentNode.parentNode;
    // extract link text
    const page = el.innerText.toLowerCase();
    setCurrentPage(page);
  }

  return (
    <nav className="nav-wrapper">
      <span>GlassFlow</span>
      <ul>
        <li onClick={linkClicked}>
          <Link to="/" className={`${currentPage === "home" ? "active" : ""}`}>
            <Home /> Home
          </Link>
        </li>
        <li onClick={linkClicked}>
          <Link
            to="/mint"
            className={`${currentPage === "mint" ? "active" : ""}`}
          >
            <PlusCircle /> Mint
          </Link>
        </li>
        <li onClick={linkClicked}>
          <Link
            to="/user"
            className={`${currentPage === "user" ? "active" : ""}`}
          >
            <User /> User 
          </Link>
        </li>
        <li onClick={linkClicked}>
          <Link
            to="/support"
            className={`${currentPage === "support" ? "active" : ""}`}
          >
            <HelpCircle /> Support
          </Link>
        </li>
        <li onClick={linkClicked}>
          <Link 
            to="/search"
            className={`${currentPage === "search" ? "active" : ""}`}
          >
            <Search /> Search
          </Link>
        </li>
      </ul>
    </nav>
  );
}