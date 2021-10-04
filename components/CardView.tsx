import { OverlayTrigger, Tooltip } from "react-bootstrap";
import styled from "styled-components";
import { Card, Rarity } from "../lib/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { forwardRef } from "react";

const CARD_TEXT_BY_RARITY = {
  [Rarity.COMMON]: styled.div`
    color: black;
  `,
  [Rarity.UNCOMMON]: styled.div`
    color: #707883;
  `,
  [Rarity.RARE]: styled.div`
    color: #a58e4a;
  `,
  [Rarity.MYTHIC]: styled.div`
    color: #bf4427;
  `,
};

const FaEye = forwardRef((props, ref) => (
  <FontAwesomeIcon forwardedRef={ref} icon={faEye} size="sm" {...props} />
));
FaEye.displayName = "FaEye";

const CardView = ({ card }: { card: Card }) => {
  const CardText =
    CARD_TEXT_BY_RARITY[card.rarity] || CARD_TEXT_BY_RARITY[Rarity.COMMON];

  return (
    <CardText>
      <OverlayTrigger
        placement="bottom-start"
        overlay={
          <Tooltip>
            <img src={card.cardUrl} alt={card.name} width="240" height="340" />
          </Tooltip>
        }
      >
        <FaEye />
      </OverlayTrigger>{" "}
      {card.name}
    </CardText>
  );
};

export default CardView;
