import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { BsExclamationOctagon } from "react-icons/bs";
import { FaInfoCircle } from "react-icons/fa";

import Banner from "components/common/Banner";
import { HOVER_CLASSES, TRANSITION_CLASSES } from "lib/styles";

import AboutProjectModal from "./AboutProjectModal";
import DarkModeToggle from "./DarkModeToggle";
import PageInfoBanner from "./PageInfoBanner";

const PageHeader = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <>
      <div className="flex items-center py-4 px-2 lg:px-6">
        <div className="mr-2">
          <Image
            src="/apple-touch-icon.png"
            alt="Logo"
            height={32}
            width={32}
            priority
            layout="fixed"
          />
        </div>

        <h1 className="grow font-belerenSmallCaps text-2xl tracking-wide">
          Limited Grades
        </h1>

        <button
          onClick={() => setShowInfoModal(true)}
          className={clsx(
            "flex gap-1 items-center",
            HOVER_CLASSES,
            TRANSITION_CLASSES
          )}
          type="button"
          aria-label="About this project"
        >
          <FaInfoCircle />
          <span className="hidden lg:inline">About this project</span>
        </button>

        <DarkModeToggle />
      </div>

      <Banner>
        <BsExclamationOctagon className="inline relative bottom-0.5 mr-2" />
        Thanks to everyone that filled out the new grading system survey. About
        a third of respondents prefer the grading scale as it is today so grades
        will remain unchanged for now.
      </Banner>

      <PageInfoBanner onLearnMore={() => setShowInfoModal(true)} />

      {showInfoModal && (
        <AboutProjectModal onClose={() => setShowInfoModal(false)} />
      )}
    </>
  );
};

export default PageHeader;
