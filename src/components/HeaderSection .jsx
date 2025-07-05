import React from "react";
import { BsArchive } from "react-icons/bs";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HeaderSection = ({ darkMode, toggleDarkMode }) => (
  <div className="flex items-center justify-between mb-4 px-3 sm:px-6">
    <div className="flex justify-center flex-1">
      <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-pink-100 rounded-full shadow dark:bg-gray-800">
        <BsArchive className="w-8 h-8 sm:w-10 sm:h-10 text-pink-500 dark:text-purple-300" />
      </div>
    </div>
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle Dark Mode"
      className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full shadow dark:bg-gray-800"
    >
      <FontAwesomeIcon
        icon={darkMode ? faSun : faMoon}
        className="text-purple-600 dark:text-purple-300"
      />
    </button>
  </div>
);

export default HeaderSection;