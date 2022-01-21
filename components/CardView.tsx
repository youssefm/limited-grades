import { FC } from "react";

import LazyTippy from "components/LazyTippy";
import { Card } from "lib/types";
import CardBubble from "components/CardBubble";

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
    const tooltipWidthClass = card.cardBackUrl ? `w-[480px]` : `w-[240px]`;
    cardView = (
      <LazyTippy
        content={
          <div className={`flex ${tooltipWidthClass}`}>
            <img src={card.cardUrl} alt={card.name} width="240" height="340" />
            {card.cardBackUrl && (
              <img
                src={card.cardBackUrl}
                alt={card.name}
                width="240"
                height="340"
              />
            )}
          </div>
        }
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
