import React, { useEffect, useState } from "react";
import { ReactComponent as Sun } from "../assets/Sun.svg";
import { ReactComponent as Moon } from "../assets/Moon.svg";
import "../css-stylings/LightMode.css"; // Assuming you have a separate CSS file for LightMode

const LightMode = () => {
  const [theme, setTheme] = useState("light");

  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    setTheme("dark");
  };

  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    setTheme("light");
  };

  useEffect(() => {
    const selectedTheme = localStorage.getItem("theme");
    if (selectedTheme === "dark") {
      setDarkMode();
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setDarkMode();
    } else {
      setLightMode();
    }
  };

  return (
    <div className="light_mode"> {/* Assuming you have a separate class for LightMode */}
      <input
        className="light_mode_input"
        type="checkbox"
        id="lightmode-toggle"
        onChange={toggleTheme}
        checked={theme === "light"}
      />
      <label className="light_mode_label" htmlFor="lightmode-toggle">
        <Sun />
        <Moon />
      </label>
    </div>
  );
};

export default LightMode;
