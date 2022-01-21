import { FC, ReactNode } from "react";
import Select, {
  components,
  OptionProps,
  SingleValueProps,
} from "react-select";

import FilterLabel from "components/FilterLabel";
import {
  ALL_DECKS,
  COLUMN_ICONS,
  DECK_COLORS,
  DECK_LABELS,
} from "lib/constants";
import { Deck } from "lib/types";

type DeckOption = { value: Deck; label: string };

const formatDeckOption = (deck: Deck, label: ReactNode) => {
  const deckColors = DECK_COLORS[deck];
  if (deckColors.length === 0) {
    return label;
  }
  return (
    <div className="flex items-center">
      {deckColors.map((column) => (
        <i key={column} className={COLUMN_ICONS[column]} />
      ))}
      <span className="ml-2">{label}</span>
    </div>
  );
};

const SingleValue = ({
  children,
  ...props
}: SingleValueProps<DeckOption, false>) => (
  <components.SingleValue {...props}>
    {formatDeckOption(props.data.value, children)}
  </components.SingleValue>
);

const Option: FC<OptionProps<DeckOption, false>> = (props) => {
  const {
    data: { value, label },
  } = props;
  return (
    <components.Option {...props}>
      {formatDeckOption(value, label)}
    </components.Option>
  );
};

interface Props {
  value: Deck;
  onChange: (selectedValue: Deck) => void;
}

const DeckSelector: FC<Props> = ({ value, onChange }) => (
  <label>
    <FilterLabel>Deck</FilterLabel>
    <Select
      value={{ value, label: DECK_LABELS[value] }}
      onChange={(selectedOption) => {
        if (selectedOption) {
          onChange(selectedOption.value);
        }
      }}
      options={ALL_DECKS.map((deck) => ({
        value: deck,
        label: DECK_LABELS[deck],
      }))}
      isMulti={false}
      components={{ Option, SingleValue }}
      instanceId="deck-select"
      className="min-w-[175px]"
    />
  </label>
);

export default DeckSelector;
