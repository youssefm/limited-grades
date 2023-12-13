import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { FaInfoCircle } from "react-icons/fa";

import Banner from "components/common/Banner";
import { HOVER_CLASSES, TRANSITION_CLASSES } from "lib/styles";

import AboutProjectModal from "./AboutProjectModal";
import DarkModeToggle from "./DarkModeToggle";
import PageInfoBanner from "./PageInfoBanner";

const BANNER_MESSAGE = process.env.NEXT_PUBLIC_BANNER_MESSAGE;

const PageHeader = (): JSX.Element => {
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
          />
        </div>

        <h1 className="grow font-belerenSmallCaps text-2xl tracking-wide">
          Limited Grades
        </h1>

        <button
          onClick={() => setShowInfoModal(true)}
          className={clsx(
            "flex items-center gap-1",
            HOVER_CLASSES,
            TRANSITION_CLASSES
          )}
          type="button"
          aria-label="About this project"
        >
          <FaInfoCircle className="-mb-0.5" />
          <span className="hidden lg:inline">About this project</span>
        </button>

        <DarkModeToggle />
      </div>

      {BANNER_MESSAGE && (
        <Banner>
          <BsFillExclamationCircleFill className="relative bottom-0.5 mr-2 inline" />
          {BANNER_MESSAGE}
        </Banner>
      )}

      <PageInfoBanner onLearnMore={() => setShowInfoModal(true)} />

      {showInfoModal && (
        <AboutProjectModal onClose={() => setShowInfoModal(false)} />
      )}
    </>
  );
};

export default PageHeader;
