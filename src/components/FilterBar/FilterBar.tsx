import clsx from "clsx";
import { FC, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

import useCardTableContext from "hooks/useCardTableContext";
import { HOVER_CLASSES, TRANSITION_CLASSES } from "lib/styles";

import CardTypeFilter from "./CardTypeFilter";
import DeckSelector from "./DeckSelector";
import FilterGroup from "./FilterGroup";
import RarityFilter from "./RarityFilter";
import SetSelector from "./SetSelector";

const FLEX_CLASSES = "flex-col gap-2 lg:flex-row lg:gap-4";

const FilterBar: FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
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
    <>
      <div
        className={clsx(
          "flex p-4 lg:px-8",
          "bg-neutral-100 dark:bg-neutral-800 rounded-t-lg",
          FLEX_CLASSES,
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
        <div
          className={clsx(FLEX_CLASSES, {
            "hidden lg:flex": !isExpanded,
            flex: isExpanded,
          })}
        >
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
      </div>
      {!isExpanded && (
        <button
          className={clsx(
            "flex justify-center py-1 w-full bg-neutral-50 dark:bg-neutral-700 lg:hidden",
            HOVER_CLASSES,
            TRANSITION_CLASSES
          )}
          onClick={() => setIsExpanded(true)}
          type="button"
          aria-label="More filters"
        >
          <FaChevronDown />
        </button>
      )}
    </>
  );
};

export default FilterBar;
