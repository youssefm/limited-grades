import constate from "constate";
import { useRouter } from "next/dist/client/router";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ALL_CARD_TYPES, ALL_RARITIES } from "lib/constants";
import { CardTableDictionary } from "lib/table";
import { Card, Deck, MagicSet } from "lib/types";

import useIsLoading from "./useIsLoading";

interface Props {
  set: MagicSet;
  cards: Card[];
}

const useCardTableContextValue = ({ set, cards }: Props) => {
  const router = useRouter();
  const [selectedSet, setSelectedSet] = useState(set);
  const [isLoading, markAsLoading, markAsLoaded] = useIsLoading(300);
  const [loadingCards, setLoadingCards] = useState(cards);
  const [deck, setDeck] = useState(Deck.ALL);
  const [visibleRarities, setVisibleRarities] = useState(new Set(ALL_RARITIES));
  const [visibleCardTypes, setVisibleCardTypes] = useState(
    new Set(ALL_CARD_TYPES)
  );

  const displayedCards = isLoading ? loadingCards : cards;

  useEffect(() => {
    if (selectedSet === set) {
      if (isLoading) {
        markAsLoaded();
      }
    } else if (isLoading) {
      router
        .push(`/${selectedSet}`)
        .catch((error) => console.log(`Failed to push new route: ${error}`));
    } else {
      setSelectedSet(set);
    }
  }, [selectedSet, set, isLoading, markAsLoaded, router]);

  const cardDictionary = useMemo(() => {
    const filteredCards = displayedCards
      .filter((card) => visibleRarities.has(card.rarity))
      .filter((card) =>
        card.cardTypes.some((cardType) => visibleCardTypes.has(cardType))
      );
    return new CardTableDictionary(filteredCards, deck);
  }, [displayedCards, deck, visibleRarities, visibleCardTypes]);

  const changeSet = useCallback(
    (newSet: MagicSet) => {
      setSelectedSet(newSet);
      setLoadingCards(cards);
      markAsLoading();
    },
    [cards, markAsLoading]
  );

  return {
    set,
    cards: displayedCards,
    selectedSet,
    changeSet,
    deck,
    setDeck,
    visibleRarities,
    setVisibleRarities,
    visibleCardTypes,
    setVisibleCardTypes,
    cardDictionary,
    showSkeletons: isLoading,
  };
};

const [CardTableContextProvider, useCardTableContext] = constate(
  useCardTableContextValue
);
export { CardTableContextProvider };
export default useCardTableContext;
