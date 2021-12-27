import Select, {
  components,
  OptionProps,
  SingleValueProps,
} from "react-select";
import styled from "styled-components";
import { COLUMN_ICONS } from "../lib/constants";

import { Column, Deck } from "../lib/types";

const DECK_LABELS: Record<Deck, string> = {
  [Deck.ALL]: "All decks",
  [Deck.WHITE_BLUE]: "Azorius",
  [Deck.BLUE_BLACK]: "Dimir",
  [Deck.BLACK_RED]: "Rakdos",
  [Deck.RED_GREEN]: "Gruul",
  [Deck.WHITE_GREEN]: "Selesnya",
  [Deck.WHITE_BLACK]: "Orzhov",
  [Deck.BLUE_RED]: "Izzet",
  [Deck.BLACK_GREEN]: "Golgari",
  [Deck.WHITE_RED]: "Boros",
  [Deck.BLUE_GREEN]: "Simic",
};

const DECK_COLORS: Record<Deck, Column[]> = {
  [Deck.ALL]: [],
  [Deck.WHITE_BLUE]: [Column.WHITE, Column.BLUE],
  [Deck.BLUE_BLACK]: [Column.BLUE, Column.BLACK],
  [Deck.BLACK_RED]: [Column.BLACK, Column.RED],
  [Deck.RED_GREEN]: [Column.RED, Column.GREEN],
  [Deck.WHITE_GREEN]: [Column.WHITE, Column.GREEN],
  [Deck.WHITE_BLACK]: [Column.WHITE, Column.BLACK],
  [Deck.BLUE_RED]: [Column.BLUE, Column.RED],
  [Deck.BLACK_GREEN]: [Column.BLACK, Column.GREEN],
  [Deck.WHITE_RED]: [Column.WHITE, Column.RED],
  [Deck.BLUE_GREEN]: [Column.BLUE, Column.GREEN],
};

const DeckSelect = styled(Select)`
  min-width: 175px;
` as typeof Select;

const OptionLabel = styled.span`
  margin-left: 8px;
`;

type DeckOption = { value: Deck; label: string };

const SingleValue = ({
  children,
  ...props
}: SingleValueProps<DeckOption, false>) => {
  const { value } = props.data;
  const deckColors = DECK_COLORS[value];

  return (
    <components.SingleValue {...props}>
      {deckColors.length > 0 ? (
        <>
          {deckColors.map((column) => (
            <i key={column} className={COLUMN_ICONS[column]} />
          ))}
          <OptionLabel>{children}</OptionLabel>
        </>
      ) : (
        children
      )}
    </components.SingleValue>
  );
};

const Option = (props: OptionProps<DeckOption, false>) => {
  const { value, label } = props.data;
  const deckColors = DECK_COLORS[value];

  return (
    <components.Option {...props}>
      {deckColors.length > 0 ? (
        <>
          {deckColors.map((column) => (
            <i key={column} className={COLUMN_ICONS[column]} />
          ))}
          <OptionLabel>{label}</OptionLabel>
        </>
      ) : (
        label
      )}
    </components.Option>
  );
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
      isMulti={false}
      components={{ Option, SingleValue }}
      instanceId="deck-select"
    />
  );
};

export default DeckSelector;
