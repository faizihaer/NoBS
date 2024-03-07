// Profile.js

import React, { useState } from "react";
import { AuthProvider, useAuth } from "../AuthService";
import "../css-stylings/SignInBtn.css";
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
    const [feet, inches] = height.toString().split(".");
    const feetValue = parseInt(feet, 10) || 0;
    const inchesValue = parseInt(inches, 10) || 0;
    return feetValue * 12 + inchesValue;
  }

  return (
    <div className="profile-page-container">
      <div className="welcome-container">
        <h1 style={{ fontSize: "32px", textAlign: "left" }}>
          Welcome, {user.name}!
        </h1>
        <div className="profile-circle">
          <img src={user.picture} alt="User profile" />
        </div>
        <h1
          className="my-profile-message"
          style={{ fontSize: "28px", textAlign: "left" }}
        >
          My Profile:
        </h1>

        <div
          className="profile-inputs"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div className="input-group">
            <label htmlFor="age" style={{ fontSize: "24px" }}>
              Age:
            </label>
            <input
              type="number"
              id="age"
              value={age}
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
              value={weightPounds}
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
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="bmi-container">
          <p style={{ fontSize: "20px", textAlign: "left" }}>BMI: {bmi}</p>
        </div>

        {isEditing ? (
          <button
            className="profile-btn"
            onClick={handleSaveChanges}
            style={{ marginTop: "20px" }}
          >
            Save Changes
          </button>
        ) : (
          <button
            className="profile-btn"
            onClick={handleEdit}
            style={{ marginTop: "20px" }}
          >
            Edit
          </button>
        )}
      </div>
      <div>
        <GymFinderButton />
      </div>
    </div>
  );
};

export default Profile;
