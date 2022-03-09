import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { ImInfo } from "react-icons/im";

import Banner from "components/common/Banner";
import LinkOut from "components/common/LinkOut";
import { HOVER_CLASSES, TRANSITION_CLASSES } from "lib/styles";

import AboutProjectModal from "./AboutProjectModal";
import DarkModeToggle from "./DarkModeToggle";

const PageHeader = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);

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

        <DarkModeToggle />
      </div>

      <Banner>
        <ImInfo className="inline relative bottom-0.5 mr-2" />
        Grades below are based on{" "}
        <LinkOut url="https://www.17lands.com/">17Lands</LinkOut> win rate data.{" "}
        <button
          onClick={() => setShowInfoModal(true)}
          className={clsx("underline", HOVER_CLASSES, TRANSITION_CLASSES)}
          type="button"
        >
          Learn more
        </button>
      </Banner>

      {showInfoModal && (
        <AboutProjectModal onClose={() => setShowInfoModal(false)} />
      )}
    </>
  );
};

export default PageHeader;
