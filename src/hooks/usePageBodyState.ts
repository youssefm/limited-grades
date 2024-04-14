import Router from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import CardTableDictionary from "lib/CardTableDictionary";
import { ALL_CARD_TYPES, ALL_RARITIES } from "lib/constants";
import Deck from "lib/Deck";
import MagicSet from "lib/MagicSet";
import {
  ALL_MANA_VALUES,
  getCardManaValue,
  MANA_VALUE_CHARACTER_MAP,
  ManaValue,
} from "lib/mana-value";
import { Card, CardType, Rarity } from "lib/types";
import { extractPathnameSegments } from "lib/util";

import useDelayedLoading from "./useDelayedLoading";
import useUrlSetState from "./useUrlSetState";
import useUrlState from "./useUrlState";

interface PageBodyState {
  displayedSet: MagicSet;
  displayedCards: Card[];
  selectedSet: MagicSet;
  changeSet: (newSet: MagicSet) => Promise<void>;
  deck: Deck;
  setDeck: (newDeck: Deck) => void;
  visibleRarities: Set<Rarity>;
  setVisibleRarities: (rarities: Set<Rarity>) => void;
  visibleCardTypes: Set<CardType>;
  setVisibleCardTypes: (cardTypes: Set<CardType>) => void;
  visibleManaValues: Set<ManaValue>;
  setVisibleManaValues: (manaValues: Set<ManaValue>) => void;
  cardDictionary: CardTableDictionary;
  showSkeletons: boolean;
}

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
  [CardType.BATTLE]: "b",
  [CardType.PLANESWALKER]: "p",
  [CardType.LAND]: "l",
};

const usePageBodyState = (set: MagicSet, cards: Card[]): PageBodyState => {
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
  const [visibleManaValues, setVisibleManaValues] = useUrlSetState(
    "mana",
    MANA_VALUE_CHARACTER_MAP,
    new Set(Object.values(ManaValue))
  );

  const isLoading = useDelayedLoading(set === selectedSet, 300);
  const loadingSet = useRef(set);
  const loadingCards = useRef(cards);

  useEffect(() => {
    const handleRouteChange = (
      url: string,
      { shallow }: { shallow: boolean }
    ): void => {
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

  const deck = urlDeck ? Deck.lookup(urlDeck) || Deck.ALL : Deck.ALL;
  const showSkeletons = isLoading();
  const displayedSet = showSkeletons ? loadingSet.current : set;
  const displayedCards = showSkeletons ? loadingCards.current : cards;

  const cardDictionary = useMemo(() => {
    let filteredCards = displayedCards;

    if (visibleRarities.size < ALL_RARITIES.length) {
      filteredCards = filteredCards.filter((card) =>
        visibleRarities.has(card.rarity)
      );
    }
    if (visibleCardTypes.size < ALL_CARD_TYPES.length) {
      filteredCards = filteredCards.filter((card) =>
        card.cardTypes.some((cardType) => visibleCardTypes.has(cardType))
      );
    }
    if (visibleManaValues.size < ALL_MANA_VALUES.length) {
      filteredCards = filteredCards.filter((card) => {
        const manaValue = getCardManaValue(card);
        return manaValue && visibleManaValues.has(manaValue);
      });
    }
    return new CardTableDictionary(filteredCards, deck);
  }, [
    displayedCards,
    deck,
    visibleRarities,
    visibleCardTypes,
    visibleManaValues,
  ]);

  const changeSet = useCallback(async (newSet: MagicSet) => {
    await Router.push({
      pathname: Router.pathname,
      query: { ...Router.query, setCode: newSet.code },
    });
  }, []);

  const setDeck = useCallback(
    (newDeck: Deck) =>
      setUrlDeck(newDeck === Deck.ALL ? undefined : newDeck.code),
    [setUrlDeck]
  );

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
    visibleManaValues,
    setVisibleManaValues,
    cardDictionary,
    showSkeletons,
  };
};

export default usePageBodyState;
