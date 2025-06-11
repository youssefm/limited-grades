import clsx from "clsx";
import { FC, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

import Collapsible from "components/common/Collapsible";
import { trackEvent } from "lib/analytics";
import Deck from "lib/Deck";
import MagicSet from "lib/MagicSet";
import { ManaValue } from "lib/mana-value";
import { HOVER_CLASSES, TRANSITION_CLASSES } from "lib/styles";
import { Card, CardType, Rarity } from "lib/types";

import CardTypeFilter from "./CardTypeFilter";
import DeckSelector from "./DeckSelector";
import FilterGroup from "./FilterGroup";
import ManaValueFilter from "./ManaValueFilter";
import RarityFilter from "./RarityFilter";
import SearchButton from "./SearchButton";
import SetSelector from "./SetSelector";

const SET_SELECTOR_INPUT_ID = "set-select-input";
const DECK_SELECTOR_INPUT_ID = "deck-select-input";
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
  visibleManaValues: Set<ManaValue>;
  setVisibleManaValues: (newManaValues: Set<ManaValue>) => void;
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
  visibleManaValues,
  setVisibleManaValues,
  searchCards,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div
        className={clsx(
          "rounded-t-lg bg-neutral-100 p-4 dark:bg-neutral-800 lg:pl-8",
          FLEX_CLASSES,
          TRANSITION_CLASSES
        )}
      >
        <FilterGroup label="Set" htmlFor={SET_SELECTOR_INPUT_ID}>
          <SetSelector
            value={selectedSet}
            onChange={changeSet}
            inputId={SET_SELECTOR_INPUT_ID}
          />
        </FilterGroup>
        <FilterGroup
          label="Deck"
          htmlFor={DECK_SELECTOR_INPUT_ID}
          className={GAP_CLASSES}
        >
          <DeckSelector
            set={selectedSet}
            value={deck}
            onChange={setDeck}
            inputId={DECK_SELECTOR_INPUT_ID}
          />
        </FilterGroup>
        <Collapsible
          isExpanded={isExpanded}
          className={clsx(
            "grow lg:!flex lg:!max-h-[none] lg:!overflow-visible",
            FLEX_CLASSES
          )}
        >
          <FilterGroup label="Rarity" className={GAP_CLASSES}>
            <RarityFilter
              set={selectedSet}
              values={visibleRarities}
              setValues={(rarities) => {
                trackEvent("filter by rarity");
                setVisibleRarities(rarities);
              }}
            />
          </FilterGroup>
          <FilterGroup label="Type" className={GAP_CLASSES}>
            <CardTypeFilter
              values={visibleCardTypes}
              setValues={(cardTypes) => {
                trackEvent("filter by card type");
                setVisibleCardTypes(cardTypes);
              }}
            />
          </FilterGroup>
          <FilterGroup
            label="Mana Value"
            className={clsx(GAP_CLASSES, "lg:hidden 1.5xl:block")}
          >
            <ManaValueFilter
              values={visibleManaValues}
              setValues={(manaValues) => {
                trackEvent("filter by mana value");
                setVisibleManaValues(manaValues);
              }}
            />
          </FilterGroup>
          <div className={clsx("lg:ml-auto", GAP_CLASSES)}>
            <SearchButton cards={searchCards} />
          </div>
        </Collapsible>
      </div>
      <Collapsible isExpanded={!isExpanded} className="lg:hidden">
        <button
          className={clsx(
            "w-full pt-1 text-neutral-300 dark:text-neutral-700",
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
