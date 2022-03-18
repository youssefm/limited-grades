import clsx from "clsx";
import { FC } from "react";

import useCardTableContext from "hooks/useCardTableContext";
import { TRANSITION_CLASSES } from "lib/styles";

import CardTypeFilter from "./CardTypeFilter";
import DeckSelector from "./DeckSelector";
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
      <SetSelector value={selectedSet} onChange={changeSet} />
      <DeckSelector value={deck} onChange={setDeck} />
      <RarityFilter
        set={set}
        values={visibleRarities}
        setValues={setVisibleRarities}
      />
      <CardTypeFilter
        values={visibleCardTypes}
        setValues={setVisibleCardTypes}
      />
    </div>
  );
};

export default FilterBar;
