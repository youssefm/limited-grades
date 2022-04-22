import { FC, useCallback } from "react";

import ColorIcon from "components/common/ColorIcon";
import { DECK_COLORS, DECK_LABELS } from "lib/constants";
import { getDecksForSet } from "lib/sets";
import { Deck, MagicSet } from "lib/types";

import IconSelect from "./IconSelect";

interface Props {
  set: MagicSet;
  value: Deck;
  onChange: (selectedValue: Deck) => void;
}

const DeckSelector: FC<Props> = ({ set, value, onChange }) => {
  const getIcon = useCallback((deck: Deck) => {
    const colors = DECK_COLORS[deck];
    if (colors.length === 0) {
      return null;
    }
    return (
      <span className="relative bottom-0.5">
        {colors.map((color) => (
          <ColorIcon key={color} color={color} className="mr-0.5 last:mr-0" />
        ))}
      </span>
    );
  }, []);
  return (
    <IconSelect
      value={value}
      onChange={(selectedValue) => {
        if (selectedValue) {
          onChange(selectedValue);
        }
      }}
      options={getDecksForSet(set)}
      getLabel={(deck) => DECK_LABELS[deck]}
      getIcon={getIcon}
      instanceId="deck-select"
      className="min-w-[175px]"
    />
  );
};

export default DeckSelector;
