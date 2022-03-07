import { useEffect, useState } from 'react';
import { Home, PlusCircle, AlignLeft, User, Compass, CreditCard, HelpCircle, Settings } from 'react-feather';
import { Link } from "react-router-dom";
import { useKeplr } from "../../components/useKeplr";
import { useBetween } from 'use-between';
import { useSnackbar } from 'notistack';
import "./nav.css";
import {
  getAuth, onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; 
import { db } from "../../firebase-config";
import { shortenAddress } from '../../helpers/utils';

export default function Nav(props: {setShowAuth: (show: boolean) => void}) {
  const [currentPage, setCurrentPage] = useState<string>();
  const [displayName, setDisplayName] = useState<string>("Login / Signup");
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const useSharedKeplr = () => useBetween(useKeplr);
  const { activateBrowserWallet, account, chainConfig } = useSharedKeplr();
  const { enqueueSnackbar } = useSnackbar();
  const auth = getAuth();

  onAuthStateChanged(auth, async (user) => {
    // setUser(currentUser);
    if (user) {
      // grab user's data
      // get db reference to current user
      const docRef = doc(db, "users", `${user.uid}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setDisplayName(docSnap.data().displayName);
        setUserLoggedIn(true);
        setUser(user);
      } 
    } else {
      setDisplayName("Login / Signup");
      setUserLoggedIn(false);
    }
  });

  useEffect(() => {
    // set current page when user first navigates to site
    const path = window.location.pathname;
    let page = path.substring(1);
    if (page === "") page = "home";
    setCurrentPage(page);

    // grab user's data
    if (auth.currentUser && auth.currentUser.displayName) {
      // display user display name 
      setDisplayName(auth.currentUser.displayName);
    }
  // eslint-disable-next-line
  }, [window.location.pathname]);

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
    // only if the user isn't logged in
    e.preventDefault();
    if (!userLoggedIn)
      props.setShowAuth(true);
  }

  const connectWallet = async () => {
    await activateBrowserWallet().then(() => {
      enqueueSnackbar('Successfully connected wallet' ,{
        variant: "info"
      });
    });
  }

  const renderDropdown = () => {
    return(
      <div className="dropdown-wrapper" onClick={() => setShowDropdown(!showDropdown)}>
        Menu
        <div className={`dropdown-items-wrapper ${showDropdown ? 'active' : ''}`}>
          <div className="dropdown-item" onClick={authClicked}>
            <User/>
            {userLoggedIn ?
              <Link to={`${user && user.uid ? `user/${user.uid}` : '/'}`}>
                {displayName}
              </Link>
            :
              <a href={!userLoggedIn ? '/' : '/user/xyz'}>
                {displayName}
              </a>
            }
          </div>
          <div className="dropdown-item">
            <HelpCircle/>
            <Link to="/support">FAQ</Link>
          </div>
          <div className="dropdown-item">
            <Settings/>
            <Link to="/support">Settings</Link>
          </div>
          <div onClick={connectWallet} className="dropdown-item">
            <CreditCard/>
            {account ? shortenAddress(account, chainConfig.addressPrefix) : "Connect Wallet"}
          </div>
        </div>
      </div>
    )
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
            to="/collections"
            className={`${currentPage === "collections" ? "active" : ""}`}
          >
            <AlignLeft /> Collections 
          </Link>
        </li>
        <li onClick={linkClicked}>
          <Link
            to="/explore"
            className={`${currentPage === "explore" ? "active" : ""}`}
          >
            <Compass/> Explore 
          </Link>
        </li>
        {renderDropdown()}
      </ul>
    </nav>
  );
}