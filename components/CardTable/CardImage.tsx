import clsx from "clsx";
import React, { FC, useState } from "react";

import { Card } from "lib/types";

interface Props {
  card: Card;
}

const DoubleFacedCardImage: FC<Props> = ({ card }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      className="relative"
      onClick={() => setFlipped(!flipped)}
      type="button"
    >
      <div
        className={clsx("transition-all ease-in-out backface-invisible", {
          "rotate-y-0": flipped,
          "rotate-y-180": !flipped,
        })}
      >
        <img src={card.cardUrl} alt={card.name} width="240" height="340" />
      </div>
      <div
        className={clsx(
          "absolute inset-0 transition-all ease-in-out backface-invisible",
          {
            "rotate-y-0": !flipped,
            "rotate-y-180": flipped,
          }
        )}
      >
        <img src={card.cardBackUrl} alt={card.name} width="240" height="340" />
      </div>
    </button>
  );
};

const CardImage: FC<Props> = ({ card }) =>
  card.cardBackUrl ? (
    <DoubleFacedCardImage card={card} />
  ) : (
    <img src={card.cardUrl} alt={card.name} width="240" height="340" />
  );

export default CardImage;
