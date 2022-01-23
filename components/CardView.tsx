import { FC } from "react";

import CardBubble from "components/CardBubble";
import LazyTippy from "components/LazyTippy";
import { Card } from "lib/types";

interface Props {
  card: Card;
  onClick: () => void;
}

const CardView: FC<Props> = ({ card, onClick }) => {
  let cardView = <CardBubble card={card} onClick={onClick} />;

  if (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover)").matches
  ) {
    let tooltip = (
      <img src={card.cardUrl} alt={card.name} width="240" height="340" />
    );
    if (card.cardBackUrl) {
      tooltip = (
        <div className="flex">
          {tooltip}
          <img
            src={card.cardBackUrl}
            alt={card.name}
            width="240"
            height="340"
          />
        </div>
      );
    }
    cardView = (
      <LazyTippy
        content={tooltip}
        placement="bottom-start"
        trigger="mouseenter"
      >
        {cardView}
      </LazyTippy>
    );
  }

  return cardView;
};

export default CardView;
