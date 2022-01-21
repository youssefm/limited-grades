import { FC } from "react";

import FilterLabel from "components/FilterLabel";
import IconSelect from "components/IconSelect";
import {
  ALL_DECKS,
  COLUMN_ICONS,
  DECK_COLORS,
  DECK_LABELS,
} from "lib/constants";
import { Deck } from "lib/types";

interface Props {
  value: Deck;
  onChange: (selectedValue: Deck) => void;
}

const DeckSelector: FC<Props> = ({ value, onChange }) => (
  <label>
    <FilterLabel>Deck</FilterLabel>
    <IconSelect
      value={value}
      onChange={onChange}
      options={ALL_DECKS}
      getLabel={(deck) => DECK_LABELS[deck]}
      getIcons={(deck) => DECK_COLORS[deck].map((color) => COLUMN_ICONS[color])}
      instanceId="deck-select"
      className="min-w-[175px]"
    />
  </label>
);

export default DeckSelector;
