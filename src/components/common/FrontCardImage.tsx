import { FC } from "react";

import { Card } from "lib/types";

interface Props {
  card: Card;
}

const FrontCardImage: FC<Props> = ({ card }) => (
  <img src={card.cardUrl} alt={card.name} width="240" height="340" />
);

export default FrontCardImage;
