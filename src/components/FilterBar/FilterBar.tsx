import clsx from "clsx";
import { FC, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

import Collapsible from "components/common/Collapsible";
import Deck from "lib/Deck";
import MagicSet from "lib/MagicSet";
import { HOVER_CLASSES, TRANSITION_CLASSES } from "lib/styles";
import { Card, CardType, Rarity } from "lib/types";

import CardTypeFilter from "./CardTypeFilter";
import DeckSelector from "./DeckSelector";
import FilterGroup from "./FilterGroup";
import RarityFilter from "./RarityFilter";
import SearchButton from "./SearchButton";
import SetSelector from "./SetSelector";

const FLEX_CLASSES = "flex flex-col lg:flex-row";
const GAP_CLASSES = "pt-2 lg:pt-0 lg:pl-4";

interface Props {
  selectedSet: MagicSet;
  changeSet: (newSet: MagicSet) => void;
  deck: Deck;
  setDeck: (newDeck: Deck) => void;
  visibleRarities: Set<Rarity>;
  setVisibleRarities: (newRarities: Set<Rarity>) => void;
  visibleCardTypes: Set<CardType>;
  setVisibleCardTypes: (newCardTypes: Set<CardType>) => void;
  searchSet: MagicSet;
  searchCards: Card[];
}

const FilterBar: FC<Props> = ({
  selectedSet,
  changeSet,
  deck,
  setDeck,
  visibleRarities,
  setVisibleRarities,
  visibleCardTypes,
  setVisibleCardTypes,
  searchSet,
  searchCards,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div
        className={clsx(
          "p-4 bg-neutral-100 dark:bg-neutral-800 rounded-t-lg lg:pl-8",
          FLEX_CLASSES,
          TRANSITION_CLASSES
        )}
      >
        <FilterGroup label="Set">
          <SetSelector value={selectedSet} onChange={changeSet} />
        </FilterGroup>
        <FilterGroup label="Deck" className={GAP_CLASSES}>
          <DeckSelector set={selectedSet} value={deck} onChange={setDeck} />
        </FilterGroup>
        <Collapsible
          isExpanded={isExpanded}
          className={clsx(
            "grow lg:!flex lg:!overflow-visible lg:!max-h-[none]",
            FLEX_CLASSES
          )}
        >
          <FilterGroup label="Rarity" disableInputLabel className={GAP_CLASSES}>
            <RarityFilter
              set={selectedSet}
              values={visibleRarities}
              setValues={setVisibleRarities}
            />
          </FilterGroup>
          <FilterGroup label="Type" disableInputLabel className={GAP_CLASSES}>
            <CardTypeFilter
              values={visibleCardTypes}
              setValues={setVisibleCardTypes}
            />
          </FilterGroup>
          <div className={clsx("lg:ml-auto", GAP_CLASSES)}>
            <SearchButton cards={searchCards} set={searchSet} />
          </div>
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
