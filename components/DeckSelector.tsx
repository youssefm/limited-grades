import Select from "react-select";
import styled from "styled-components";

import { Deck } from "../lib/types";

const DeckSelect = styled(Select)`
  min-width: 175px;
`;

const DECK_LABELS: Record<Deck, string> = {
  [Deck.ALL]: "All decks",
  [Deck.WHITE_BLUE]: "Azorius (WU)",
  [Deck.BLUE_BLACK]: "Dimir (UB)",
  [Deck.BLACK_RED]: "Rakdos (BR)",
  [Deck.RED_GREEN]: "Gruul (RG)",
  [Deck.WHITE_GREEN]: "Selesnya (WG)",
  [Deck.WHITE_BLACK]: "Orzhov (WB)",
  [Deck.BLUE_RED]: "Izzet (UR)",
  [Deck.BLACK_GREEN]: "Golgari (BG)",
  [Deck.WHITE_RED]: "Boros (WR)",
  [Deck.BLUE_GREEN]: "Simic (UG)",
};

interface Props {
  value: Deck;
  onChange: (selectedValue: Deck) => void;
}

const DeckSelector = (props: Props) => {
  const { value, onChange } = props;

  return (
    <DeckSelect
      value={{ value: value, label: DECK_LABELS[value] }}
      onChange={(selectedOption) => {
        if (selectedOption) {
          onChange(selectedOption.value);
        }
      }}
      options={Object.values(Deck).map((deck) => ({
        value: deck,
        label: DECK_LABELS[deck],
      }))}
      instanceId="deck-select"
    />
  );
};

export default DeckSelector;
