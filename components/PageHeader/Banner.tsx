import clsx from "clsx";
import { FC, useState } from "react";
import { ImInfo } from "react-icons/im";
import { IoClose } from "react-icons/io5";

import LinkOut from "components/common/LinkOut";
import { HOVER_CLASSES, TRANSITION_CLASSES } from "lib/styles";

interface Props {
  onReadMore: () => void;
}

const Banner: FC<Props> = ({ onReadMore }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={clsx(
        "flex items-center py-1 px-4 mb-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg",
        TRANSITION_CLASSES
      )}
    >
      <ImInfo className="mr-2 min-w-[1rem]" />
      <div className="grow">
        Grades below are based on{" "}
        <LinkOut url="https://www.17lands.com/">17Lands</LinkOut> win rate data.{" "}
        <button
          onClick={onReadMore}
          className={clsx(HOVER_CLASSES, TRANSITION_CLASSES)}
          type="button"
        >
          Read more...
        </button>
      </div>
      <button onClick={() => setIsVisible(false)} type="button">
        <IoClose
          className={clsx("text-2xl", HOVER_CLASSES, TRANSITION_CLASSES)}
        />
      </button>
    </div>
  );
};

export default Banner;
