import Tippy from "@tippyjs/react";
import { FC, useState } from "react";

import { Card } from "lib/types";

import CardBubble from "./CardBubble";

interface Props {
  card: Card;
  onClick: () => void;
  enableHover: boolean;
}

const CardView: FC<Props> = ({ card, onClick, enableHover }) => {
  const [isTippyMounted, setIsTippyMounted] = useState(false);

  let cardView = (
    <CardBubble
      card={card}
      onClick={onClick}
      onMouseEnter={enableHover ? () => setIsTippyMounted(true) : undefined}
    />
  );

  if (isTippyMounted) {
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
      <Tippy content={tooltip} placement="bottom-start" trigger="mouseenter">
        {cardView}
      </Tippy>
    );
  }

  return cardView;
};

export default CardView;
