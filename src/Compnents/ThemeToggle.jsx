// src/ThemeToggle.js
import React from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "../Context/ThemeContext";

const ThemeToggleComp = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded flex items-center"
    >
      {theme === "dark" ? (
        <>
          <MdLightMode className="mr-2 w-6 h-6" />
        </>
      ) : (
        <>
          <MdDarkMode className="mr-2 w-6 h-6" />
        </>
      )}
    </button>
  );
};

export default ThemeToggleComp;
