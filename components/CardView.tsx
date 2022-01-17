import styled from "styled-components";

import { Card, Rarity } from "lib/types";

const CardText = styled.span`
  cursor: pointer;
`;
const CARD_TEXT_BY_RARITY = {
  [Rarity.COMMON]: styled(CardText)`
    color: #1a1718;
  `,
  [Rarity.UNCOMMON]: styled(CardText)`
    color: #707883;
  `,
  [Rarity.RARE]: styled(CardText)`
    color: #a58e4a;
  `,
  [Rarity.MYTHIC]: styled(CardText)`
    color: #bf4427;
  `,
};

interface Props {
  card: Card;
  onClick: () => void;
}

const CardView = (props: Props) => {
  const { card, onClick } = props;

  const CardText =
    CARD_TEXT_BY_RARITY[card.rarity] || CARD_TEXT_BY_RARITY[Rarity.COMMON];

  return (
    // TODO: Re-enable hover functionality
    // <img src={card.cardUrl} alt={card.name} width="240" height="340" />
    // {card.cardBackUrl && (
    //   <img
    //     src={card.cardBackUrl}
    //     alt={card.name}
    //     width="240"
    //     height="340"
    //   />
    // )}
    <CardText onClick={onClick}>{card.name}</CardText>
  );
};

export default CardView;
