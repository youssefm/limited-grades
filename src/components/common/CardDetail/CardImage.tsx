import clsx from "clsx";
import React, { FC, ReactEventHandler, useState } from "react";
import { GrRotateLeft, GrRotateRight } from "react-icons/gr";

import BackCardImage from "components/common/BackCardImage";
import FrontCardImage from "components/common/FrontCardImage";
import { HOVER_CLASSES, TRANSITION_CLASSES } from "lib/styles";
import { Card } from "lib/types";

interface Props {
  card: Card;
  className?: string;
  onLoad?: ReactEventHandler<HTMLImageElement>;
}

const DoubleFacedCardImage: FC<Props> = ({ card, className, onLoad }) => {
  const [flipped, setFlipped] = useState(false);

  const toggleFlipped = () => setFlipped(!flipped);
  return (
    <div className={clsx("relative mb-6", className)}>
      <button onClick={toggleFlipped} type="button" aria-label="Flip card">
        <div
          className={clsx(
            "backface-invisible transition-transform duration-500 ease-in-out",
            {
              "rotate-y-0": !flipped,
              "rotate-y-180": flipped,
            }
          )}
        >
          <FrontCardImage card={card} onLoad={onLoad} />
        </div>
        <div
          className={clsx(
            "backface-invisible absolute inset-0 transition-transform duration-500 ease-in-out",
            {
              "rotate-y-0": flipped,
              "rotate-y-180": !flipped,
            }
          )}
        >
          <BackCardImage card={card} />
        </div>
      </button>
      <div className="absolute inset-x-0 -bottom-6">
        <button
          className={clsx(
            "mx-auto block rounded-full bg-neutral-200 p-2 text-2xl dark:bg-neutral-800",
            HOVER_CLASSES,
            TRANSITION_CLASSES
          )}
          onClick={toggleFlipped}
          type="button"
          aria-label="Flip card"
        >
          {flipped ? <GrRotateLeft /> : <GrRotateRight />}
        </button>
      </div>
    </div>
  );
};

const CardImage: FC<Props> = ({ card, className, onLoad }) =>
  card.cardBackUrl ? (
    <DoubleFacedCardImage card={card} className={className} onLoad={onLoad} />
  ) : (
    <FrontCardImage card={card} className={className} onLoad={onLoad} />
  );

export default CardImage;
