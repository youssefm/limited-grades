import { FC, useCallback } from "react";

import ColorIcon from "components/common/ColorIcon";
import Deck from "lib/Deck";
import MagicSet from "lib/MagicSet";

import IconSelect from "./IconSelect";

interface Props {
  set: MagicSet;
  value: Deck;
  onChange: (selectedValue: Deck) => void;
  inputId?: string;
}

const DeckSelector: FC<Props> = ({ set, value, onChange, inputId }) => {
  const getIcon = useCallback((deck: Deck) => {
    if (deck.colors.length === 0) {
      return null;
    }
    return (
      <span className="relative bottom-0.5">
        {deck.colors.map((color) => (
          <ColorIcon key={color} color={color} className="mr-px last:mr-0" />
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
      options={[Deck.ALL].concat(set.decks)}
      getLabel={(deck) => set.getDeckLabel(deck)}
      getIcon={getIcon}
      instanceId="deck-select"
      inputId={inputId}
      className="min-w-[200px]"
    />
  );
};

export default DeckSelector;
