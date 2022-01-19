import { Home, PlusCircle, User, HelpCircle, Search } from 'react-feather';
import { Link } from "react-router-dom";
import "./nav.css"

export default function Nav() {
  return(
    <nav className="nav-wrapper">
      <span>GlassFlow</span>
      <ul>
        <li><Link to="/"><Home/> Home</Link></li> 
        <li><Link to="/mint"><PlusCircle/> Mint</Link></li> 
        <li><Link to="/user"><User/> Wallet</Link></li> 
        <li><Link to="/support"><HelpCircle/> Support</Link></li> 
        <li><Link to="/search"><Search/> Search</Link></li> 
      </ul>
    </nav>
  )
}