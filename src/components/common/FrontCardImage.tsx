import { FC } from "react";

import { Card } from "lib/types";

interface Props {
  card: Card;
  className?: string;
}

const FrontCardImage: FC<Props> = ({ card, className }) => (
  <img
    src={card.cardUrl}
    alt={card.name}
    width="240"
    height="340"
    className={className}
  />
);

export default FrontCardImage;
