import Image from "next/image";
import { useState } from "react";
import { FaInfoCircle, FaMoon, FaSun } from "react-icons/fa";

import useDarkMode from "hooks/useDarkMode";

import AboutProjectModal from "./AboutProjectModal";

const TitleBar = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [darkModeEnabled, toggle] = useDarkMode();

  return (
    <>
      <div className="flex items-center py-4 px-2 lg:px-6">
        <div className="mr-2">
          <Image
            src="/apple-touch-icon.png"
            alt="Limited Grades"
            height={32}
            width={32}
          />
        </div>

        <h1 className="grow font-belerenSmallCaps text-2xl">Limited Grades</h1>

        <button
          onClick={() => setShowInfoModal(true)}
          className="flex gap-1 items-center hover:text-blue-500"
          type="button"
        >
          <FaInfoCircle />
          <span className="hidden md:inline">About this project</span>
        </button>

        <button className="ml-4 text-2xl" type="button" onClick={toggle}>
          {darkModeEnabled ? (
            <FaSun className="hover:text-amber-600" />
          ) : (
            <FaMoon className="hover:text-blue-500" />
          )}
        </button>
      </div>

      {showInfoModal && (
        <AboutProjectModal onClose={() => setShowInfoModal(false)} />
      )}
    </>
  );
};

export default TitleBar;
