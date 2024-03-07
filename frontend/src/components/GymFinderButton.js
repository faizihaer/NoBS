import React, { useState } from "react";
import NearestGymFinder from "./NearestGym"; 
import Profile from "../pages/Profile";
const GymFinderButton = () => {
  const [showGyms, setShowGyms] = useState(false);

  const handleToggleGyms = () => {
    setShowGyms(!showGyms);
  };

  return (
    <div>
      <button onClick={handleToggleGyms}>Toggle Gyms</button>
      {showGyms && <NearestGymFinder />}
    </div>
  );
};

export default GymFinderButton;
