import { useEffect, useState } from 'react';
import { Home, PlusCircle, User, HelpCircle, Search, UserPlus } from 'react-feather';
import { Link } from "react-router-dom";
import { useKeplr } from "../../components/useKeplr";
import "./nav.css"

export default function Nav(props: {setShowAuth: (show: boolean) => void}) {
  const [currentPage, setCurrentPage] = useState<string>();
  const [walletAddress, setWalletAddress] = useState<string>();
  const { activateBrowserWallet } = useKeplr();

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

  const connectWallet = async () => {
    let addr:any = await activateBrowserWallet();
    addr = addr.address;

    if (addr) {
      addr = `${addr.substring(0, 10)}...${addr.substring(addr.length - 5, addr.length - 1)}`
      setWalletAddress(addr);
    }
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
          {walletAddress ? walletAddress : "Connect Wallet"}
        </li>
      </ul>
    </nav>
  );
}