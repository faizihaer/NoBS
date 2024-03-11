// Profile.js

import React, { useState } from "react";
import { AuthProvider, useAuth } from "../AuthService";
import "../css-stylings/profile.css";
import GymFinderButton from "../components/GymFinderButton";

const Profile = () => {
  const { user } = useAuth();
  const [age, setAge] = useState(user.age || "");
  const [weightPounds, setWeightPounds] = useState(user.weightPounds || "");
  const [height, setHeight] = useState(user.height || "");
  const [isEditing, setIsEditing] = useState(true);
  const [bmi, setBMI] = useState(calculateBMI(weightPounds, height));

  const handleSaveChanges = () => {
    console.log("Changes saved:", { age, weightPounds, height });

    setBMI(calculateBMI(weightPounds, height));

    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  function calculateBMI(weightPounds, height) {
    const heightInInches = parseHeight(height);
    return ((weightPounds / (heightInInches * heightInInches)) * 703).toFixed(
      2
    );
  }

  function parseHeight(height) {
    const [feetStr, inchesStr] = height.toString().split(".");
    const feet = parseInt(feetStr, 10) || 0;
    const inches = parseInt(inchesStr, 10) || 0;
    return feet * 12 + inches;
  }
  return (
    <div className="profile-page-container">
      <div className="profile-section">
          <h1 className="my-profile-message">My Profile:</h1>
          <div className="profile-circle">
          <img src={user.picture} alt="User profile" />
        </div>
          <div className="profile-inputs">
            <div className="input-group">
              <label htmlFor="age" style={{ fontSize: "24px" }}>
                Age:
              </label>
              <input
                type="number"
                id="age"
                value={user.age}
                onChange={(e) => setAge(e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="input-group">
              <label htmlFor="weightPounds" style={{ fontSize: "24px" }}>
                Weight (lbs):
              </label>
              <input
                type="number"
                id="weightPounds"
                value={user.weightPounds}
                onChange={(e) => setWeightPounds(e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="input-group">
              <label htmlFor="height" style={{ fontSize: "24px" }}>
                Height (feet.inches):
              </label>
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
                Save Changes
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
