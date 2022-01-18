import { LazyTippy } from "components/LazyTippy";
import { Card, Rarity } from "lib/types";

// Note: if we try to use string interpolation to create these,
// TailwindCSS stops recognizing them and purges them from the CSS
const BG_COLORS = {
  [Rarity.COMMON]: "bg-common",
  [Rarity.UNCOMMON]: "bg-uncommon",
  [Rarity.RARE]: "bg-rare",
  [Rarity.MYTHIC]: "bg-mythic",
};

interface Props {
  card: Card;
  onClick: () => void;
}

const CardView = (props: Props) => {
  const { card, onClick } = props;

  const tooltipWidthClass = card.cardBackUrl ? `w-[480px]` : `w-[240px]`;

  return (
    <div className="mb-1 last:mb-0">
      <LazyTippy
        content={
          <div className={`flex ${tooltipWidthClass}`}>
            <img src={card.cardUrl} alt={card.name} width="240" height="340" />
            {card.cardBackUrl && (
              <img
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
          className="flex rounded cursor-pointer overflow-hidden hover:text-zinc-500"
        >
          <div className={`w-[3px] ${BG_COLORS[card.rarity]} shrink-0`} />
          <div className="w-full bg-white py-0.5 px-2">
            <span className="text-sm">{card.name}</span>
          </div>
        </div>
      </LazyTippy>
    </div>
  );
};

export default CardView;
