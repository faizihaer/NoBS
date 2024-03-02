import { AuthProvider, useAuth } from "../AuthService";
import "../css-stylings/SignInBtn.css";
import "../css-stylings/profile.css"

import React, { useState } from "react";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="welcome-container">
        <h1>You are signed in as</h1>
        <h1>{user.name}</h1>
        <div className="profile-circle">
          <img src={user.picture} alt="User profile" />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
