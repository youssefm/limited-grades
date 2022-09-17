import clsx from "clsx";
import { forwardRef } from "react";

import { HOVER_CLASSES, TRANSITION_CLASSES } from "lib/styles";
import { Card, Rarity } from "lib/types";

// Note: if we try to use string interpolation to create these,
// TailwindCSS stops recognizing them and purges them from the CSS
const BORDER_COLORS = {
  [Rarity.COMMON]: clsx(
    "border-common dark:border-neutral-300",
    TRANSITION_CLASSES
  ),
  [Rarity.UNCOMMON]: "border-uncommon",
  [Rarity.RARE]: "border-rare",
  [Rarity.MYTHIC]: "border-mythic",
};

export interface Props {
  card: Card;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const CardBubble = forwardRef<HTMLButtonElement, Props>(
  ({ card, onClick, onMouseEnter, onMouseLeave }, ref) => (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={clsx(
        "mb-1 w-full px-2 text-left last:mb-0",
        "underline-offset-2 hover:underline",
        "border-l-[3px] bg-white dark:bg-neutral-700",
        HOVER_CLASSES,
        TRANSITION_CLASSES,
        BORDER_COLORS[card.rarity]
      )}
      type="button"
      ref={ref}
    >
      {card.name}
    </button>
  )
);

CardBubble.displayName = "CardBubble";

export default CardBubble;
