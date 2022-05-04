import constate from "constate";
import Router from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import CardTableDictionary from "lib/CardTableDictionary";
import { ALL_CARD_TYPES, ALL_RARITIES } from "lib/constants";
import Deck from "lib/Deck";
import MagicSet from "lib/MagicSet";
import { Card, CardType, Rarity } from "lib/types";
import { extractPathnameSegments } from "lib/util";

import useDelayedLoading from "./useDelayedLoading";
import useUrlSetState from "./useUrlSetState";
import useUrlState from "./useUrlState";

const ALL_RARITIES_SET = new Set(ALL_RARITIES);
const ALL_CARD_TYPES_SET = new Set(ALL_CARD_TYPES);

const RARITY_CHARACTER_MAP: Record<Rarity, string> = {
  [Rarity.COMMON]: "c",
  [Rarity.UNCOMMON]: "u",
  [Rarity.RARE]: "r",
  [Rarity.MYTHIC]: "m",
};

const CARD_TYPE_CHARACTER_MAP: Record<CardType, string> = {
  [CardType.CREATURE]: "c",
  [CardType.INSTANT]: "i",
  [CardType.SORCERY]: "s",
  [CardType.ARTIFACT]: "a",
  [CardType.ENCHANTMENT]: "e",
  [CardType.PLANESWALKER]: "p",
  [CardType.LAND]: "l",
};

interface Props {
  set: MagicSet;
  cards: Card[];
}

const useCardTableContextValue = ({ set, cards }: Props) => {
  const [selectedSet, setSelectedSet] = useState(set);
  const [urlDeck, setUrlDeck] = useUrlState("deck");
  const [visibleRarities, setVisibleRarities] = useUrlSetState(
    "rarity",
    RARITY_CHARACTER_MAP,
    ALL_RARITIES_SET
  );
  const [visibleCardTypes, setVisibleCardTypes] = useUrlSetState(
    "type",
    CARD_TYPE_CHARACTER_MAP,
    ALL_CARD_TYPES_SET
  );

  const isLoading = useDelayedLoading(set === selectedSet, 300);
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
          loadingCards.current = cards;
          setSelectedSet(routeSet);
        }
      }
    };

    Router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      Router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [cards]);

  const deck = urlDeck ? Deck.lookup(urlDeck) || Deck.ALL : Deck.ALL;
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

  const changeSet = useCallback(async (newSet: MagicSet) => {
    await Router.push(`/${newSet.code}${window.location.search}`);
  }, []);

  const setDeck = useCallback(
    (newDeck: Deck) =>
      setUrlDeck(newDeck === Deck.ALL ? undefined : newDeck.code),
    [setUrlDeck]
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
