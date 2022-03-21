import clsx from "clsx";
import { FC } from "react";

import { ALL_DECKS, DECK_COLORS, DECK_LABELS } from "lib/constants";
import { COLUMN_ICONS } from "lib/styles";
import { Deck } from "lib/types";

import IconSelect from "./IconSelect";

interface Props {
  value: Deck;
  onChange: (selectedValue: Deck) => void;
  className?: string;
}

const DeckSelector: FC<Props> = ({ value, onChange, className }) => (
  <IconSelect
    value={value}
    onChange={onChange}
    options={ALL_DECKS}
    getLabel={(deck) => DECK_LABELS[deck]}
    getIcons={(deck) => DECK_COLORS[deck].map((color) => COLUMN_ICONS[color])}
    instanceId="deck-select"
    className={clsx("min-w-[175px]", className)}
  />
);

export default DeckSelector;
