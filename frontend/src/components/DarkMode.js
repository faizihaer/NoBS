import React, { useEffect, useState } from "react";
import { ReactComponent as Sun } from "../assets/Sun.svg";
import { ReactComponent as Moon } from "../assets/Moon.svg";
import "../css-stylings/DarkMode.css";

const DarkMode = ({ setImage }) => {
  const [theme, setTheme] = useState("light");

// dark mode
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    setTheme("dark");
    // dark background, use white logo
    setImage("Nobswhite.png");
  };

  // light mode
  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    setTheme("light");
    // light background, use dark logo
    setImage("Nobs.png");
  };

  // modified this code to make sure app launch is on dark mode
  useEffect(() => {
    const selectedTheme = localStorage.getItem("theme");
    if (selectedTheme === "dark") {
      setDarkMode();
    } else {
      setLightMode();
    }
  }, []);


// toggle controls
  const toggleTheme = () => {
    // no light mode for Auth page, always dark background
    if (window.location.pathname === "/Auth"){
      setDarkMode();
      setImage("Nobswhite.png"); // update image immediately
    }
    else if (theme === "light") {
      setDarkMode();
      setImage("Nobswhite.png"); // update image immediately
    } 
    else {
      setLightMode();
      setImage("Nobs.png"); // update image immediately
    }
  };

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
        checked={theme === "dark"}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <Sun />
        <Moon />
      </label>
    </div>
  );
};

export default DarkMode;
