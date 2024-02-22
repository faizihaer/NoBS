// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/goal-list">Goal List</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
