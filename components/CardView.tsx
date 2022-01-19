import Image from "next/image";
import { FC } from "react";

import { LazyTippy } from "components/LazyTippy";
import { Card, Rarity } from "lib/types";

// Note: if we try to use string interpolation to create these,
// TailwindCSS stops recognizing them and purges them from the CSS
const BORDER_COLORS = {
  [Rarity.COMMON]: "border-common",
  [Rarity.UNCOMMON]: "border-uncommon",
  [Rarity.RARE]: "border-rare",
  [Rarity.MYTHIC]: "border-mythic",
};

interface Props {
  card: Card;
  onClick: () => void;
}

const CardView: FC<Props> = (props) => {
  const { card, onClick } = props;

  const tooltipWidthClass = card.cardBackUrl ? `w-[480px]` : `w-[240px]`;

  return (
    <LazyTippy
      content={
        <div className={`flex ${tooltipWidthClass}`}>
          <Image src={card.cardUrl} alt={card.name} width="240" height="340" />
          {card.cardBackUrl && (
            <Image
              src={card.cardBackUrl}
              alt={card.name}
              width="240"
              height="340"
            />
          )}
        </div>
      }
      placement="bottom-start"
    >
      <div
        onClick={onClick}
        className={`card-bubble ${BORDER_COLORS[card.rarity]}`}
      >
        {card.name}
      </div>
    </LazyTippy>
  );
};

export default CardView;
