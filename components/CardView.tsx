import { FC } from "react";

import CardBubble from "components/CardBubble";
import LazyTippy from "components/LazyTippy";
import { Card } from "lib/types";

interface Props {
  card: Card;
  onClick: () => void;
}

const CardView: FC<Props> = (props) => {
  const { card, onClick } = props;

  const tooltipWidthClass = card.cardBackUrl ? `w-[480px]` : `w-[240px]`;

  return (
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
    >
      <CardBubble card={card} onClick={onClick} />
    </LazyTippy>
  );
};

export default CardView;
