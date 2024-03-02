import React, { useState } from "react";
import "../css-stylings/SignInBtn.css";
import { AuthProvider, useAuth } from "../AuthService";
import { Link } from "react-router-dom";

const GroupPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="welcome-container">
        <h1>Welcome, {user.name}</h1>
        <div className="profile-circle">
          <img src={user.picture} alt="User profile" />
        </div>

        <div className="groupSelection">
          <h2>Enter a Group ID or Create a New Group to join NoBS!</h2>
          <div className="input-container">
            <label htmlFor="groupId">Group ID:</label>
            <input type="text" id="groupId" placeholder="Enter Group ID" />

            {/* For the specific group, we should have them go to /Home/#32132  for those users */}
            <Link to="/Home">
              <button className="submit-button">Submit</button>
            </Link>
          </div>

          <Link to="/Home">
            <button className="create-group-button">Create a Group</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
