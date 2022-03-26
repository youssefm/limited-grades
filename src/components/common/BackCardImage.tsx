import { FC } from "react";

import { Card } from "lib/types";

interface Props {
  card: Card;
}

const BackCardImage: FC<Props> = ({ card }) =>
  card.cardBackUrl ? (
    <img src={card.cardBackUrl} alt={card.name} width="240" height="340" />
  ) : null;

export default BackCardImage;
