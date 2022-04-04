import { FC, ReactEventHandler } from "react";

import { Card } from "lib/types";

interface Props {
  card: Card;
  className?: string;
  onLoad?: ReactEventHandler<HTMLImageElement>;
}

const FrontCardImage: FC<Props> = ({ card, className, onLoad }) => (
  <img
    src={card.cardUrl}
    alt={card.name}
    width="240"
    height="340"
    className={className}
    onLoad={onLoad}
    onError={onLoad}
  />
);
export default FrontCardImage;
