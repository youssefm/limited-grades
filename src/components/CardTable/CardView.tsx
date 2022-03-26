import Tippy from "@tippyjs/react";
import { FC, useState } from "react";

import BackCardImage from "components/common/BackCardImage";
import FrontCardImage from "components/common/FrontCardImage";
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
    let tooltip = <FrontCardImage card={card} />;
    if (card.cardBackUrl) {
      tooltip = (
        <div className="flex">
          {tooltip}
          <BackCardImage card={card} />
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
