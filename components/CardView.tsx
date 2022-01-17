import { Card, Rarity } from "lib/types";

// Note: if we try to use string interpolation to create these,
// TailwindCSS stops recognizing them and purges them from the CSS
const TEXT_COLORS = {
  [Rarity.COMMON]: "text-common",
  [Rarity.UNCOMMON]: "text-uncommon",
  [Rarity.RARE]: "text-rare",
  [Rarity.MYTHIC]: "text-mythic",
};

interface Props {
  card: Card;
  onClick: () => void;
}

const CardView = (props: Props) => {
  const { card, onClick } = props;

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
    <div>
      <span
        onClick={onClick}
        className={`cursor-pointer ${TEXT_COLORS[card.rarity]}`}
      >
        {card.name}
      </span>
    </div>
  );
};

export default CardView;
