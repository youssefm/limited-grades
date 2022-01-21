import Image from "next/image";
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

import AboutProjectModal from "components/AboutProjectModal";

const TitleBar = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <>
      <div className="flex px-2 lg:px-6 py-4 items-center">
        <div className="mr-2">
          <Image
            src="/apple-touch-icon.png"
            alt="Limited Grades"
            height={32}
            width={32}
          />
        </div>

        <h1 className="text-2xl font-belerenSmallCaps flex-auto">
          Limited Grades
        </h1>

        <button
          onClick={() => setShowInfoModal(true)}
          className="hover:text-blue-500 flex gap-1 justify-center items-center"
          type="button"
        >
          <FaInfoCircle />
          <span className="hidden md:inline">About this project</span>
        </button>
      </div>

      {showInfoModal && (
        <AboutProjectModal onClose={() => setShowInfoModal(false)} />
      )}
    </>
  );
};

export default TitleBar;
