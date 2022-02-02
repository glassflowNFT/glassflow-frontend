import { useEffect, useState } from 'react';
import { Home, PlusCircle, User, HelpCircle, Search, UserPlus } from 'react-feather';
import { Link } from "react-router-dom";
import { useKeplr } from "../../components/useKeplr";
import { useBetween } from 'use-between';
import "./nav.css"

export default function Nav(props: {setShowAuth: (show: boolean) => void}) {
  const [currentPage, setCurrentPage] = useState<string>();
  const useSharedKeplr = () => useBetween(useKeplr);
  const { activateBrowserWallet, account } = useSharedKeplr();

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

  const authClicked = (e: any) => {
    // show the user authentication modal
    props.setShowAuth(true);
  }

  const shortenAddress = (addr: string) => {
      return `${addr.substring(0, 10)}...${addr.substring(addr.length - 5, addr.length - 1)}`
  }

  const connectWallet = async () => {
    await activateBrowserWallet();
  }

  return (
    <nav className="nav-wrapper">
      <a href="/" className="site-title">GlassFlow</a>
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
        <li onClick={authClicked}>
          <Link 
            to={`/${currentPage === 'home' ? '/' : currentPage}`}
          >
            <UserPlus/> Login / Signup 
          </Link>
        </li>
        <li onClick={connectWallet} className="connect-wallet-button">
          {account ? shortenAddress(account) : "Connect Wallet"}
        </li>
      </ul>
    </nav>
  );
}