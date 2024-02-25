import React, { useEffect, useState } from "react";
import { ReactComponent as Sun } from "../assets/Sun.svg";
import { ReactComponent as Moon } from "../assets/Moon.svg";
import "../css-stylings/DarkMode.css";

const DarkMode = () => {
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
