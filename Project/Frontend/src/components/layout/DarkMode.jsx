import React from "react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import useDarkMode from "../../hooks/UseDarkMode.js";

const DarkMode = () => {
  const [theme, toggleTheme] = useDarkMode();

  return (
    <button onClick={toggleTheme} className="text-2xl">
      {theme === "dark" ? <BiSolidSun /> : <BiSolidMoon />}
    </button>
  );
};

export default DarkMode;
