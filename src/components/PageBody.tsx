import { FC } from "react";

import CardTable from "components/CardTable";
import FilterBar from "components/FilterBar";
import usePageBodyState from "hooks/usePageBodyState";
import MagicSet from "lib/MagicSet";
import { Card } from "lib/types";

interface Props {
  set: MagicSet;
  cards: Card[];
  className?: string;
}

const PageBody: FC<Props> = ({ set, cards, className }) => {
  const {
    displayedCards,
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
    cardDictionary,
    showSkeletons,
  } = usePageBodyState(set, cards);

  return (
    <div className={className}>
      <FilterBar
        selectedSet={selectedSet}
        changeSet={changeSet}
        deck={deck}
        setDeck={setDeck}
        visibleRarities={visibleRarities}
        setVisibleRarities={setVisibleRarities}
        visibleCardTypes={visibleCardTypes}
        setVisibleCardTypes={setVisibleCardTypes}
        visibleManaValues={visibleManaValues}
        setVisibleManaValues={setVisibleManaValues}
        searchCards={displayedCards}
      />
      <CardTable
        cardDictionary={cardDictionary}
        showSkeletons={showSkeletons}
      />
    </div>
  );
};

export default PageBody;
