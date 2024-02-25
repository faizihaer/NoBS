import React from "react";
import { Link } from "react-router-dom";
import "../css-stylings/Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <nav className="navbar-container">
        <div className="left-section">
          <img src="LOGO" alt="Logo" className="logo" />
          <h2>
            <Link to="/" className="title">
              NoBS
            </Link>
          </h2>
        </div>
        <div className="right-section">
          <ul className="nav-links">
            <li>
              <h4 className="group-id">GROUP ID: ########</h4>
            </li>
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li>
              <button className="logout-btn">Log Out</button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
