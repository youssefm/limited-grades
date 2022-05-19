import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { BsExclamationOctagon } from "react-icons/bs";
import { FaInfoCircle } from "react-icons/fa";

import Banner from "components/common/Banner";
import LinkOut from "components/common/LinkOut";
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
        <BsExclamationOctagon className="inline relative bottom-0.5 mr-2" />I am
        looking to update how overall grades are calculated. If you have a
        minute, please{" "}
        <LinkOut url="https://docs.google.com/forms/d/e/1FAIpQLScOVmIoe8eNsVOkNn1qWjf17ln6RYeZr1CIvubrIxPJg-6_hA/viewform">
          check out a preview of the new grading system and fill out a very
          short survey
        </LinkOut>
      </Banner>

      <PageInfoBanner onLearnMore={() => setShowInfoModal(true)} />

      {showInfoModal && (
        <AboutProjectModal onClose={() => setShowInfoModal(false)} />
      )}
    </>
  );
};

export default PageHeader;
