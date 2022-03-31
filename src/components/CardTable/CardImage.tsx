import clsx from "clsx";
import React, { FC, useState } from "react";
import { GrRotateLeft, GrRotateRight } from "react-icons/gr";

import BackCardImage from "components/common/BackCardImage";
import FrontCardImage from "components/common/FrontCardImage";
import { HOVER_CLASSES, TRANSITION_CLASSES } from "lib/styles";
import { Card } from "lib/types";

interface Props {
  card: Card;
}

const DoubleFacedCardImage: FC<Props> = ({ card }) => {
  const [flipped, setFlipped] = useState(false);

  const toggleFlipped = () => setFlipped(!flipped);
  return (
    <div className="relative mb-6">
      <button onClick={toggleFlipped} type="button" aria-label="Flip card">
        <div
          className={clsx(
            "transition-transform ease-in-out backface-invisible",
            {
              "rotate-y-0": !flipped,
              "rotate-y-180": flipped,
            }
          )}
        >
          <FrontCardImage card={card} />
        </div>
        <div
          className={clsx(
            "absolute inset-0 transition-transform ease-in-out backface-invisible",
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
            "block p-2 mx-auto text-2xl bg-neutral-200 dark:bg-neutral-800 rounded-full",
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

const CardImage: FC<Props> = ({ card }) =>
  card.cardBackUrl ? (
    <DoubleFacedCardImage card={card} />
  ) : (
    <FrontCardImage card={card} />
  );

export default CardImage;
