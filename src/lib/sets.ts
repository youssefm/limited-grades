import { SET_START_DATES } from "lib/constants";
import { MagicSet } from "lib/types";

import Deck from "./decks";

const RECENT_SET_THRESHOLD_IN_DAYS = 30;
const EMBARGO_DURATION_IN_DAYS = 12;

const computeDaysSinceDate = (dateString: string): number =>
  (Date.now() - new Date(dateString).getTime()) / (24 * 60 * 60 * 1000);

export const isRecentSet = (set: MagicSet): boolean =>
  computeDaysSinceDate(SET_START_DATES[set]) < RECENT_SET_THRESHOLD_IN_DAYS;

export const isSetUnderEmbargo = (set: MagicSet): boolean =>
  computeDaysSinceDate(SET_START_DATES[set]) < EMBARGO_DURATION_IN_DAYS;

export const getDecksForSet = (set: MagicSet): Deck[] => {
  const decks = [Deck.ALL];
  if (set === MagicSet.STRIXHAVEN) {
    decks.push(Deck.ORZHOV, Deck.IZZET, Deck.GOLGARI, Deck.BOROS, Deck.SIMIC);
  } else if (set === MagicSet.RAVNICA_ALLEGIANCE) {
    decks.push(Deck.AZORIUS, Deck.RAKDOS, Deck.GRUUL, Deck.ORZHOV, Deck.SIMIC);
  } else if (set === MagicSet.GUILDS_OF_RAVNICA) {
    decks.push(Deck.DIMIR, Deck.SELESNYA, Deck.IZZET, Deck.GOLGARI, Deck.BOROS);
  } else {
    decks.push(
      Deck.AZORIUS,
      Deck.DIMIR,
      Deck.RAKDOS,
      Deck.GRUUL,
      Deck.SELESNYA,
      Deck.ORZHOV,
      Deck.IZZET,
      Deck.GOLGARI,
      Deck.BOROS,
      Deck.SIMIC
    );
  }

  return decks;
};
