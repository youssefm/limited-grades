import { forwardRef } from "react";

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

const CardBubble = forwardRef<HTMLDivElement, Props>(
  ({ card, onClick }, ref) => {
    return (
      <div
        onClick={onClick}
        className={`w-full bg-white py-1 px-2 mb-1 last:mb-0 border-l-[3px] ${
          BORDER_COLORS[card.rarity]
        } cursor-pointer hover:text-zinc-500`}
        ref={ref}
      >
        {card.name + " (" + (card.diff > 0 ? "+" : "") + card.diff + ")"}
        <img style={{display: "inline", float: "right"}} src={card.diffSvg}/>
      </div>
    );
  }
);

CardBubble.displayName = "CardBubble";

export default CardBubble;
