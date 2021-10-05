import { OverlayTrigger, Tooltip } from "react-bootstrap";
import styled from "styled-components";
import { Card, Rarity } from "../lib/types";

const CardText = styled.div`
  cursor: pointer;
`;

const CARD_TEXT_BY_RARITY = {
  [Rarity.COMMON]: CardText,
  [Rarity.UNCOMMON]: styled(CardText)`
    color: #707883;
    cursor: pointer;
  `,
  [Rarity.RARE]: styled(CardText)`
    color: #a58e4a;
    cursor: pointer;
  `,
  [Rarity.MYTHIC]: styled(CardText)`
    color: #bf4427;
    cursor: pointer;
  `,
};

const CardView = ({ card }: { card: Card }) => {
  const CardText =
    CARD_TEXT_BY_RARITY[card.rarity] || CARD_TEXT_BY_RARITY[Rarity.COMMON];

  return (
    <OverlayTrigger
      placement="bottom-start"
      overlay={
        <Tooltip>
          <img src={card.cardUrl} alt={card.name} width="240" height="340" />
        </Tooltip>
      }
    >
      <CardText>{card.name}</CardText>
    </OverlayTrigger>
  );
};

export default CardView;
