import { Fragment, useEffect, useState } from 'react';
import { Home, PlusCircle, AlignLeft, User, Compass, CreditCard, HelpCircle, Settings, LogOut, Zap, UserCheck } from 'react-feather';
import { Link } from "react-router-dom";
import { useKeplr } from "../../components/useKeplr";
import { useBetween } from 'use-between';
import { useSnackbar } from 'notistack';
import "./nav.css";
import {
  getAuth, onAuthStateChanged, signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; 
import { db } from "../../firebase-config";
import { shortenAddress } from '../../helpers/utils';
import Search from '../Search/Search';


export default function Nav(props: {setShowAuth: (show: boolean) => void}) {
  const [currentPage, setCurrentPage] = useState<string>();
  const [displayName, setDisplayName] = useState<string>("Login / Signup");
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
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
        // setDisplayName(docSnap.data().displayName);
        const firstName = docSnap.data().firstName;
        const lastName = docSnap.data().lastName;
        setDisplayName(`${firstName} ${lastName}`);
        setUserLoggedIn(true);
        setUser(user);
        if (docSnap.data().isAdmin && docSnap.data().isAdmin === true) setIsAdmin(true);
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
      // TODO: set display name as "firstName lastName"
      // setDisplayName(auth.currentUser.displayName);
      // setDisplayName(`${auth.currentUser.firstName} ${auth.currentUser.lastName}`);
    }
  // eslint-disable-next-line
  }, [window.location.pathname]);

  /*
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
  */

  const authClicked = (e: any) => {
    // show the user authentication modal
    // only if the user isn't logged in
    e.preventDefault();
    if (!userLoggedIn)
      props.setShowAuth(true);
  }

  const userLogOut = async () => {
    signOut(auth);
    enqueueSnackbar('Successfully logged out' ,{
      variant: "success"
    });
  }

  const connectWallet = async () => {
    await activateBrowserWallet().then((err: string) => {
      if (!err)
        enqueueSnackbar('Successfully connected wallet' ,{
          variant: "info"
        });
      else 
        enqueueSnackbar(err ,{
          variant: "error"
        });
    });
  }

  const renderDropdown = () => {
    return(
      <div className="dropdown-wrapper" onClick={() => setShowDropdown(!showDropdown)}>
        Menu
        <div className={`dropdown-items-wrapper ${showDropdown ? 'active' : ''}`}>
          {renderNavLinks()}
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
          {isAdmin && 
            <div className="dropdown-item">
              <UserCheck/>
              <Link to="/admin/verification">Admin</Link>
            </div>
          }
          {user &&
            <div className="dropdown-item">
              <Settings/>
              <Link to="/settings">Settings</Link>
            </div>
          }
          {user &&
            <div 
              className="dropdown-item"
              onClick={userLogOut}
            >
              <LogOut/>
              <Link to="/settings">Logout</Link>
            </div>
          }
          <div onClick={connectWallet} className="dropdown-item">
            <CreditCard/>
            {account ? shortenAddress(account, chainConfig.addressPrefix) : "Connect Wallet"}
          </div>
        </div>
      </div>
    )
  }

  const renderNavLinks = () => {
    return(
      <Fragment>
        <Link 
          to="/" 
          className={`dropdown-item multi ${currentPage === "home" ? "active" : ""}`}
        >
          <Home /> Home
        </Link>
        <Link
          to="/mint"
          className={`dropdown-item multi ${currentPage === "mint" ? "active" : ""}`}
        >
          <PlusCircle /> Mint
        </Link>
        <Link 
          to="/collections"
          className={`dropdown-item multi ${currentPage === "collections" ? "active" : ""}`}
        >
          <AlignLeft /> Collections 
        </Link>
        <Link
          to="/explore"
          className={`dropdown-item multi ${currentPage === "explore" ? "active" : ""}`}
        >
          <Compass/> Explore 
        </Link>
        <Link
          to="/genetics"
          className={`dropdown-item multi ${currentPage === "genetics" ? "active" : ""}`}
        >
          <Zap/> Genetics
        </Link>
      </Fragment>
    );
  }

  return (
    <nav className="nav-wrapper">
      <div className="nav-wrapper-large">
        <Link to="/" className="site-title">GlassFlow</Link>
        <div className="nav-search-wrapper">
          <Search/>
        </div>
        <ul>
          <div className="nav-links-wrapper">
            {renderNavLinks()} 
          </div>
          {renderDropdown()}
        </ul>
      </div>
      <div className="nav-wrapper-small">
        <div className="nav-search-wrapper">
          <Search/>
        </div>
      </div>
    </nav>
  );
}