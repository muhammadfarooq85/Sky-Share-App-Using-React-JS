// Libraries Imports
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext();

const ThemeProviderContext = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProviderContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ThemeContext, ThemeProviderContext };
