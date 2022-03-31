import clsx from "clsx";
import { FC, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

import Collapsible from "components/common/Collapsible";
import useCardTableContext from "hooks/useCardTableContext";
import { HOVER_CLASSES, TRANSITION_CLASSES } from "lib/styles";

import CardTypeFilter from "./CardTypeFilter";
import DeckSelector from "./DeckSelector";
import FilterGroup from "./FilterGroup";
import RarityFilter from "./RarityFilter";
import SetSelector from "./SetSelector";

const FLEX_CLASSES = "flex flex-col gap-2 lg:flex-row lg:gap-4";

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
          "px-4 pt-4 pb-2 lg:px-8 lg:pb-4",
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
        <Collapsible
          isExpanded={isExpanded}
          className={clsx("lg:!max-h-[none]", FLEX_CLASSES)}
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
              className="grow pb-2"
            />
          </FilterGroup>
        </Collapsible>
      </div>
      <Collapsible isExpanded={!isExpanded} className="lg:hidden">
        <button
          className={clsx(
            "pt-1 w-full text-neutral-300 dark:text-neutral-700",
            HOVER_CLASSES,
            TRANSITION_CLASSES
          )}
          onClick={() => setIsExpanded(true)}
          type="button"
          aria-label="More filters"
        >
          <FaChevronDown className="mx-auto" />
        </button>
      </Collapsible>
    </>
  );
};

export default FilterBar;
