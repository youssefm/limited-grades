import clsx from "clsx";
import { FC, useCallback } from "react";

import { ALL_DECKS, DECK_COLORS, DECK_LABELS } from "lib/constants";
import { COLUMN_ICONS } from "lib/styles";
import { Deck } from "lib/types";

import IconSelect from "./IconSelect";

interface Props {
  value: Deck;
  onChange: (selectedValue: Deck) => void;
  className?: string;
}

const DeckSelector: FC<Props> = ({ value, onChange, className }) => {
  const getIcon = useCallback((deck: Deck) => {
    const colors = DECK_COLORS[deck];
    if (colors.length === 0) {
      return null;
    }
    return (
      <span>
        {colors.map((color) => (
          <i
            key={color}
            className={clsx(COLUMN_ICONS[color], "mr-0.5 last:mr-0")}
          />
        ))}
      </span>
    );
  }, []);
  return (
    <IconSelect
      value={value}
      onChange={onChange}
      options={ALL_DECKS}
      getLabel={(deck) => DECK_LABELS[deck]}
      getIcon={getIcon}
      instanceId="deck-select"
      className={clsx("min-w-[175px]", className)}
    />
  );
};

export default DeckSelector;
