import styled from "styled-components";
import { Card, Rarity } from "../lib/types";

const CARD_BY_RARITY = {
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

const CardView = ({ card }: { card: Card }) => {
  const Card = CARD_BY_RARITY[card.rarity] || CARD_BY_RARITY[Rarity.COMMON];
  return <Card>{card.name}</Card>;
};

export default CardView;
