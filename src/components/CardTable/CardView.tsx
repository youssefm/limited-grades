import Tippy from "@tippyjs/react";
import { FC, useState } from "react";

import { Card } from "lib/types";

import CardBubble, { Props as CardBubbleProps } from "./CardBubble";

interface Props {
  card: Card;
  onClick: () => void;
  enableHover: boolean;
}

const CardView: FC<Props> = ({ card, onClick, enableHover }) => {
  const [isHoverMounted, setIsHoverMounted] = useState(false);

  const cardBubbleProps: CardBubbleProps = {
    card,
    onClick,
  };
  if (enableHover) {
    cardBubbleProps.onMouseEnter = () => setIsHoverMounted(true);
  }

  if (isHoverMounted) {
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
    return (
      <Tippy content={tooltip} placement="bottom-start" trigger="mouseenter">
        <CardBubble {...cardBubbleProps} enableHover />
      </Tippy>
    );
  }

  return <CardBubble {...cardBubbleProps} />;
};

export default CardView;
