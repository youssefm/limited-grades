import clsx from "clsx";
import { forwardRef } from "react";

import { TRANSITION_CLASSES } from "lib/styles";
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

interface Props {
  card: Card;
  onClick: () => void;
}

const CardBubble = forwardRef<HTMLButtonElement, Props>(
  ({ card, onClick }, ref) => (
    <button
      onClick={onClick}
      className={clsx(
        "px-2 mb-1 last:mb-0 w-full text-left",
        "hover:text-blue-500 dark:hover:text-amber-600",
        "bg-white dark:bg-neutral-700 border-l-[3px]",
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
