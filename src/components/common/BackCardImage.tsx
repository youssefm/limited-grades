import { FC, ReactEventHandler } from "react";

import { Card } from "lib/types";

interface Props {
  card: Card;
  onLoad?: ReactEventHandler<HTMLImageElement>;
}

const BackCardImage: FC<Props> = ({ card, onLoad }) =>
  card.cardBackUrl ? (
    <img
      src={card.cardBackUrl}
      alt={card.name}
      width="240"
      height="340"
      onLoad={onLoad}
      onError={onLoad}
    />
  ) : null;

export default BackCardImage;
