// Libraries Imports
import { useContext } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
// Local Imports
import { ThemeContext } from "../Context/ThemeContext";

function ThemeToggleComp() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded flex items-center"
    >
      {theme === "dark" ? (
        <MdLightMode className="dark:text-darkSecondary w-8 h-8" />
      ) : (
        <MdDarkMode className="w-8 h-8" />
      )}
    </button>
  );
}

export default ThemeToggleComp;
