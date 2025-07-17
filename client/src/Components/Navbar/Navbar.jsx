import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png"
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Imperial Logo"  className="logo"/>
      </div>
      <ul className="nav-links">
        <li><Link to="/"> HOME <FaAngleDown className="arr"/></Link></li>
        <li><Link to="/about">ABOUT </Link></li>
        <li> <Link>SERVICE </Link></li>
        <li> <Link>PAGE <FaAngleDown className="arr"/></Link>     </li> 
        <li><Link to="/contact">CONTACT US </Link> </li> 
      </ul>
    </nav>
  );
};

export default Navbar;
