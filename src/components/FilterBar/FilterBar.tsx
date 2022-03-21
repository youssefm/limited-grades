import clsx from "clsx";
import { FC } from "react";

import useCardTableContext from "hooks/useCardTableContext";
import { TRANSITION_CLASSES } from "lib/styles";

import CardTypeFilter from "./CardTypeFilter";
import DeckSelector from "./DeckSelector";
import FilterGroup from "./FilterGroup";
import RarityFilter from "./RarityFilter";
import SetSelector from "./SetSelector";

const FilterBar: FC = () => {
  const {
    set,
    selectedSet,
    changeSet,
    deck,
    setDeck,
    visibleRarities,
    setVisibleRarities,
    visibleCardTypes,
    setVisibleCardTypes,
  } = useCardTableContext();

  return (
    <div
      className={clsx(
        "flex flex-col gap-2 p-4",
        "bg-neutral-100 dark:bg-neutral-800 rounded-t-lg",
        "lg:flex-row lg:gap-4 lg:px-8",
        TRANSITION_CLASSES
      )}
    >
      <FilterGroup label="Set">
        <SetSelector
          value={selectedSet}
          onChange={changeSet}
          className="grow"
        />
      </FilterGroup>
      <FilterGroup label="Deck">
        <DeckSelector value={deck} onChange={setDeck} className="grow" />
      </FilterGroup>
      <FilterGroup label="Rarity" disableInputLabel>
        <RarityFilter
          set={set}
          values={visibleRarities}
          setValues={setVisibleRarities}
          className="grow"
        />
      </FilterGroup>
      <FilterGroup label="Type" disableInputLabel>
        <CardTypeFilter
          values={visibleCardTypes}
          setValues={setVisibleCardTypes}
          className="grow"
        />
      </FilterGroup>
    </div>
  );
};

export default FilterBar;
