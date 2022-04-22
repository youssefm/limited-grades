import { SET_START_DATES } from "lib/constants";
import { Deck, MagicSet } from "lib/types";

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
    decks.push(
      Deck.WHITE_BLACK,
      Deck.BLUE_RED,
      Deck.BLACK_GREEN,
      Deck.WHITE_RED,
      Deck.BLUE_GREEN
    );
  } else if (set === MagicSet.RAVNICA_ALLEGIANCE) {
    decks.push(
      Deck.WHITE_BLUE,
      Deck.BLACK_RED,
      Deck.RED_GREEN,
      Deck.WHITE_BLACK,
      Deck.BLUE_GREEN
    );
  } else if (set === MagicSet.GUILDS_OF_RAVNICA) {
    decks.push(
      Deck.BLUE_BLACK,
      Deck.WHITE_GREEN,
      Deck.BLUE_RED,
      Deck.BLACK_GREEN,
      Deck.WHITE_RED
    );
  } else {
    decks.push(
      Deck.WHITE_BLUE,
      Deck.BLUE_BLACK,
      Deck.BLACK_RED,
      Deck.RED_GREEN,
      Deck.WHITE_GREEN,
      Deck.WHITE_BLACK,
      Deck.BLUE_RED,
      Deck.BLACK_GREEN,
      Deck.WHITE_RED,
      Deck.BLUE_GREEN
    );
  }

  return decks;
};
