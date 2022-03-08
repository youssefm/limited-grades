import clsx from "clsx";
import { FC, useEffect, useRef, useState } from "react";
import { ImInfo } from "react-icons/im";
import { IoClose } from "react-icons/io5";

import LinkOut from "components/common/LinkOut";
import { HOVER_CLASSES, TRANSITION_CLASSES } from "lib/styles";

interface Props {
  onLearnMore: () => void;
}

const Banner: FC<Props> = ({ onLearnMore }) => {
  const bannerElement = useRef<HTMLDivElement>(null);

  return (
    <div
      className="overflow-hidden mb-2 transition-max-h ease-[ease]"
      ref={bannerElement}
    >
      <div
        className={clsx(
          "flex items-center py-1.5 px-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg lg:px-4",
          TRANSITION_CLASSES
        )}
      >
        <div className="grow">
          <ImInfo className="inline relative bottom-0.5 mr-2" />
          Grades below are based on{" "}
          <LinkOut url="https://www.17lands.com/">17Lands</LinkOut> win rate
          data.{" "}
          <button
            onClick={onLearnMore}
            className={clsx("underline", HOVER_CLASSES, TRANSITION_CLASSES)}
            type="button"
          >
            Learn more
          </button>
        </div>
        <button
          onClick={() => {
            const currentBannerElement = bannerElement.current;
            if (currentBannerElement) {
              currentBannerElement.style.maxHeight = `${currentBannerElement.scrollHeight}px`;
              setTimeout(() => {
                currentBannerElement.style.maxHeight = "0";
              });
            }
          }}
          type="button"
        >
          <IoClose
            className={clsx("text-2xl", HOVER_CLASSES, TRANSITION_CLASSES)}
            aria-label="Close Banner"
          />
        </button>
      </div>
    </div>
  );
};

export default Banner;
