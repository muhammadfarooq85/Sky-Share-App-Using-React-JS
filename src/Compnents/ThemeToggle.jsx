import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "../Context/ThemeContext";

const ThemeToggleComp = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded flex items-center"
    >
      {theme === "dark" ? (
        <>
          <MdLightMode className="dark:text-darkSecondary w-8 h-8" />
        </>
      ) : (
        <>
          <MdDarkMode className="w-8 h-8" />
        </>
      )}
    </button>
  );
};

export default ThemeToggleComp;
