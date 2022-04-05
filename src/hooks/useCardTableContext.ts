import constate from "constate";
import { useRouter } from "next/dist/client/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ALL_CARD_TYPES, ALL_RARITIES, ALL_SETS } from "lib/constants";
import { CardTableDictionary } from "lib/table";
import { Card, Deck, MagicSet } from "lib/types";

import useDelayedLoading from "./useDelayedLoading";

interface Props {
  set: MagicSet;
  cards: Card[];
}

const useCardTableContextValue = ({ set, cards }: Props) => {
  const router = useRouter();
  const [selectedSet, setSelectedSet] = useState(set);
  const [deck, setDeck] = useState(Deck.ALL);
  const [visibleRarities, setVisibleRarities] = useState(new Set(ALL_RARITIES));
  const [visibleCardTypes, setVisibleCardTypes] = useState(
    new Set(ALL_CARD_TYPES)
  );

  const isLoading = useDelayedLoading(set === selectedSet, 300);
  const loadingCards = useRef(cards);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const routeSet = new URL(url, "http://localhost").pathname
        .slice(1)
        .split("/")[0];
      if ((ALL_SETS as string[]).includes(routeSet)) {
        loadingCards.current = cards;
        setSelectedSet(routeSet as MagicSet);
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events, cards]);

  const showSkeletons = isLoading();
  const displayedCards = showSkeletons ? loadingCards.current : cards;

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
      router
        .push(`/${newSet}`)
        .catch((error) => console.log(`Failed to push new route: ${error}`));
    },
    [router]
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
    showSkeletons,
  };
};

const [CardTableContextProvider, useCardTableContext] = constate(
  useCardTableContextValue
);
export { CardTableContextProvider };
export default useCardTableContext;
