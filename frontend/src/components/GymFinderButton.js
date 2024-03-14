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
      <button style={{ fontSize: "15px", paddingTop: "15px", paddingBottom: "15px", marginLeft: "40px"}} onClick={handleToggleGyms}>Toggle Nearby Gyms</button>
      {showGyms && <NearestGymFinder />}
    </div>
  );
};

export default GymFinderButton;
