import React, { useState } from "react";
import "../css-stylings/group.css";
import { AuthProvider, useAuth } from "../AuthService";
import { Link } from "react-router-dom";
import NoBSHome from '../assets/WomanPull.mp4'

const GroupPage = () => {
  const { user } = useAuth();

  return (
<div className="container">
  <div className="welcome-container">
    <h1>Welcome, {user.name}</h1>
  </div>
  
  <div className="Videorunner">
    <video src={NoBSHome} autoPlay loop muted />
  </div>
  <div className ="text">
    <h2>Begin your fitness journey by joining a group or making your own!</h2>
  </div>
  <div className="input-container">
    <input type="text" id="groupId" placeholder="Enter Group Name" />
    <div>
    <Link to="/Home">
        <button className="create-group-button">Join</button>
      </Link>
      </div>
      <div>
      <Link to="/Home">
        <button className="submit-button">Create</button>
      </Link>
      </div>
  </div>
</div>
  );
};

export default GroupPage;
