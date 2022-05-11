import Router from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import CardTableDictionary from "lib/CardTableDictionary";
import { ALL_CARD_TYPES, ALL_RARITIES } from "lib/constants";
import Deck from "lib/Deck";
import MagicSet from "lib/MagicSet";
import { Card } from "lib/types";
import { extractPathnameSegments } from "lib/util";

import useDelayedLoading from "./useDelayedLoading";

const ALL_RARITIES_SET = new Set(ALL_RARITIES);
const ALL_CARD_TYPES_SET = new Set(ALL_CARD_TYPES);

const usePageBodyState = (set: MagicSet, cards: Card[]) => {
  const [selectedSet, setSelectedSet] = useState(set);
  const [deck, setDeck] = useState(Deck.ALL);
  const [visibleRarities, setVisibleRarities] = useState(ALL_RARITIES_SET);
  const [visibleCardTypes, setVisibleCardTypes] = useState(ALL_CARD_TYPES_SET);

  const isLoading = useDelayedLoading(set === selectedSet, 300);
  const loadingSet = useRef(set);
  const loadingCards = useRef(cards);

  useEffect(() => {
    const handleRouteChange = (
      url: string,
      { shallow }: { shallow: boolean }
    ) => {
      if (shallow) {
        return;
      }
      const routeSetCode = extractPathnameSegments(url)[0];
      if (routeSetCode) {
        const routeSet = MagicSet.lookup(routeSetCode);
        if (routeSet) {
          loadingSet.current = set;
          loadingCards.current = cards;
          setSelectedSet(routeSet);
        }
      }
    };

    Router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      Router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [set, cards]);

  const showSkeletons = isLoading();
  const displayedSet = showSkeletons ? loadingSet.current : set;
  const displayedCards = showSkeletons ? loadingCards.current : cards;

  const cardDictionary = useMemo(() => {
    const filteredCards = displayedCards
      .filter((card) => visibleRarities.has(card.rarity))
      .filter((card) =>
        card.cardTypes.some((cardType) => visibleCardTypes.has(cardType))
      );
    return new CardTableDictionary(filteredCards, deck);
  }, [displayedCards, deck, visibleRarities, visibleCardTypes]);

  const changeSet = useCallback(async (newSet: MagicSet) => {
    await Router.push(
      {
        pathname: Router.pathname,
        query: { ...Router.query, setCode: newSet.code },
      },
      `/${newSet.code}${window.location.search}`
    );
  }, []);

  return {
    displayedSet,
    displayedCards,
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

export default usePageBodyState;
