import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css-stylings/Navbar.css";
import DarkMode from "./DarkMode";


const Navbar = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
    const [visible, setVisible] = useState(true);
  
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        const isVisible = prevScrollPos > currentScrollPos;
  
        setPrevScrollPos(currentScrollPos);
        setVisible(isVisible);
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [prevScrollPos]);
  
    return (
      <div className={`navbar ${visible ? "" : "navbar-hidden"}`}>
        <nav className="navbar-container">
          <div className="left-section">
            <Link to="/" className="title">
              <img src="Nobswhite.png" alt="Logo" className="logo" />
            </Link>
          </div>
          <div className="right-section">
            <ul className="nav-links">
              <li>
                {/* You can add additional styling to this Link */}
                <Link to="/" className="nav-link">
                  Welcome
                </Link>
              </li>
              <li>
                {/* You can add additional styling to this Link */}
                
                <Link to="/Home" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <button className="logout-btn">Log Out</button>
              </li>
              <li>
                <DarkMode />
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  };
  
  export default Navbar;
  