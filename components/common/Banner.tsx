import clsx from "clsx";
import { FC, useRef } from "react";
import { IoClose } from "react-icons/io5";

import { HOVER_CLASSES, TRANSITION_CLASSES } from "lib/styles";

const Banner: FC = ({ children }) => {
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
        <div className="grow">{children}</div>
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
