import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { FaInfoCircle, FaMoon, FaSun } from "react-icons/fa";

import useDarkMode from "hooks/useDarkMode";
import { HOVER_CLASSES, TRANSITION_CLASSES } from "lib/styles";

import AboutProjectModal from "./AboutProjectModal";

const PageHeader = () => {
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
          className={clsx(
            "flex gap-1 items-center",
            HOVER_CLASSES,
            TRANSITION_CLASSES
          )}
          type="button"
        >
          <FaInfoCircle />
          <span className="hidden md:inline">About this project</span>
        </button>

        <button
          className={clsx("ml-4 text-2xl", HOVER_CLASSES, TRANSITION_CLASSES)}
          type="button"
          onClick={toggle}
          aria-label="Toggle dark mode"
        >
          {darkModeEnabled ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {showInfoModal && (
        <AboutProjectModal onClose={() => setShowInfoModal(false)} />
      )}
    </>
  );
};

export default PageHeader;
