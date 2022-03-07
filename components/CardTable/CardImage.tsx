import clsx from "clsx";
import React, { FC, useState } from "react";
import { GrRotateLeft, GrRotateRight } from "react-icons/gr";

import { HOVER_CLASSES, TRANSITION_CLASSES } from "lib/styles";
import { Card } from "lib/types";

interface Props {
  card: Card;
}

const DoubleFacedCardImage: FC<Props> = ({ card }) => {
  const [flipped, setFlipped] = useState(false);

  const toggleFlipped = () => setFlipped(!flipped);
  return (
    <div className="relative">
      <button onClick={toggleFlipped} type="button">
        <div
          className={clsx("transition-all ease-in-out backface-invisible", {
            "rotate-y-0": !flipped,
            "rotate-y-180": flipped,
          })}
        >
          <img src={card.cardUrl} alt={card.name} width="240" height="340" />
        </div>
        <div
          className={clsx(
            "absolute inset-0 transition-all ease-in-out backface-invisible",
            {
              "rotate-y-0": flipped,
              "rotate-y-180": !flipped,
            }
          )}
        >
          <img
            src={card.cardBackUrl}
            alt={card.name}
            width="240"
            height="340"
          />
        </div>
      </button>
      <div className="flex absolute inset-x-0 -bottom-6 justify-center">
        <button
          className={clsx(
            "p-2 text-2xl bg-neutral-200 dark:bg-neutral-800 rounded-full",
            HOVER_CLASSES,
            TRANSITION_CLASSES
          )}
          onClick={toggleFlipped}
          type="button"
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
    <img src={card.cardUrl} alt={card.name} width="240" height="340" />
  );

export default CardImage;
