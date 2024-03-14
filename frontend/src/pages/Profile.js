// Profile.js

import React, { useState } from "react";
import { AuthProvider, useAuth } from "../AuthService";
import "../css-stylings/profile.css";
import "../css-stylings/Fonts/Nohemi-Thin.css";
import GymFinderButton from "../components/GymFinderButton";
import profileCard from '../assets/profileCard1.jpg';
import crossfit from '../assets/crossfit.jpg';
const Profile = () => {
  //initializaiton
  const { user } = useAuth();
  const [age, setAge] = useState(user.age || "");
  const [weightPounds, setWeightPounds] = useState(user.weightPounds || "");
  const [height, setHeight] = useState(user.height || "");
  const [isEditing, setIsEditing] = useState(true);
  const [bmi, setBMI] = useState(calculateBMI(weightPounds, height));

  //save changes for the age weight and height thing
  const handleSaveChanges = () => {
    console.log("Changes saved:", { age, weightPounds, height });

    setBMI(calculateBMI(weightPounds, height));

    setIsEditing(false);
  };
// if editing 
  const handleEdit = () => {
    setIsEditing(true);
  };

  // BMI CALCULATOR not sure if this is the universal way, just learned from internet how to caluclate
  function calculateBMI(weightPounds, height) {
    const heightInInches = parseHeight(height);
    return ((weightPounds / (heightInInches * heightInInches)) * 703).toFixed(
      2
    );
  }
// this is to account for the inches, didnt wanna have like a separate box since it looked kinda ugly
  function parseHeight(height) {
    const [feetStr, inchesStr] = height.toString().split(".");
    const feet = parseInt(feetStr, 10) || 0;
    const inches = parseInt(inchesStr, 10) || 0;
    return feet * 12 + inches;
  }
  return (
    <div>
    <img className="crossfit-background" src={crossfit} alt="Profile Card" />
      <img className="profile-card" src={profileCard} alt="Profile Card" />
      <div className="profile-section">
          <p className="my-profile-message">My Profile:</p>
          <div className="profile-circle" >
          <img src={user.picture} alt="User profile" />
        </div>
          <div className="profile-inputs">
            <div className="input-group">
              <p htmlFor="age" style={{ fontSize: "24px" }}>
                Age:
              </p>
              <input
                type="number"
                id="age"
                value={user.age}
                onChange={(e) => setAge(e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="input-group">
              <p htmlFor="weightPounds" style={{ fontSize: "24px" }}>
                Weight (lbs):
              </p>
              <input
                type="number"
                id="weightPounds"
                value={user.weightPounds}
                onChange={(e) => setWeightPounds(e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="input-group">
              <p htmlFor="height" style={{ fontSize: "24px" }}>
                Height (feet.inches):
              </p>
              <input
                type="text"
                id="height"
                value={user.height}
                onChange={(e) => setHeight(e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="bmi-container">
              <p style={{ fontSize: "20px", textAlign: "center" }}>BMI: {bmi}</p>
          </div>
          <div className="profile-buttons">
            {isEditing ? (
              <button className="profile-btn" onClick={handleSaveChanges}>
                Calculate BMI
              </button>
            ) : (
              <button className="profile-btn" onClick={handleEdit}>
                Edit
              </button>
            )}
          </div>
      </div>
      <div className="gym-Finder">
        <GymFinderButton />
      </div>
    </div>
    
  );
};
export default Profile;
