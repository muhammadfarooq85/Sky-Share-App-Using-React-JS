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
          <MdLightMode className="dark:text-darkSecondary mr-2 w-8 h-8" />
        </>
      ) : (
        <>
          <MdDarkMode className="mr-2 w-8 h-8" />
        </>
      )}
    </button>
  );
};

export default ThemeToggleComp;
