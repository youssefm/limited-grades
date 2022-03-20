import { Temporal } from "@js-temporal/polyfill";

import { CardType, Column, Deck, Grade, MagicSet, Rarity } from "lib/types";

export const ALL_SETS = Object.values(MagicSet);
export const ALL_DECKS = Object.values(Deck);
export const ALL_COLUMNS = Object.values(Column);
export const ALL_GRADES = Object.values(Grade);
export const ALL_RARITIES = Object.values(Rarity);
export const ALL_CARD_TYPES = Object.values(CardType);

export const SET_LABELS: Record<MagicSet, string> = {
  [MagicSet.NEON_DYNASTY]: "Neon Dynasty",
  [MagicSet.CRIMSON_VOW]: "Crimson Vow",
  [MagicSet.MIDNIGHT_HUNT]: "Midnight Hunt",
  [MagicSet.FORGOTTEN_REALM]: "Forgotten Realms",
  [MagicSet.STRIXHAVEN]: "Strixhaven",
  [MagicSet.KALDHEIM]: "Kaldheim",
  [MagicSet.ZENDIKAR]: "Zendikar Rising",
  [MagicSet.IKORIA]: "Ikoria",
  [MagicSet.WAR_OF_THE_SPARK]: "War of the Spark",
  [MagicSet.RAVNICA_ALLEGIANCE]: "Ravnica Allegiance",
  [MagicSet.GUILDS_OF_RAVNICA]: "Guilds of Ravnica",
  [MagicSet.DOMINARIA]: "Dominaria",
  [MagicSet.AMONKHET]: "Amonkhet",
  [MagicSet.KALADESH]: "Kaladesh",
  [MagicSet.ARENA_CUBE]: "Arena Cube",
  [MagicSet.DOUBLE_FEATURE]: "Double Feature",
};

export const SET_START_DATES: Record<MagicSet, Temporal.PlainDate> = {
  [MagicSet.NEON_DYNASTY]: new Temporal.PlainDate(2022, 2, 10),
  [MagicSet.CRIMSON_VOW]: new Temporal.PlainDate(2021, 11, 11),
  [MagicSet.MIDNIGHT_HUNT]: new Temporal.PlainDate(2021, 9, 16),
  [MagicSet.FORGOTTEN_REALM]: new Temporal.PlainDate(2021, 7, 8),
  [MagicSet.STRIXHAVEN]: new Temporal.PlainDate(2021, 4, 15),
  [MagicSet.KALDHEIM]: new Temporal.PlainDate(2021, 1, 28),
  [MagicSet.ZENDIKAR]: new Temporal.PlainDate(2020, 9, 17),
  [MagicSet.IKORIA]: new Temporal.PlainDate(2020, 4, 16),
  [MagicSet.WAR_OF_THE_SPARK]: new Temporal.PlainDate(2020, 4, 16),
  [MagicSet.RAVNICA_ALLEGIANCE]: new Temporal.PlainDate(2020, 4, 16),
  [MagicSet.GUILDS_OF_RAVNICA]: new Temporal.PlainDate(2020, 4, 16),
  [MagicSet.DOMINARIA]: new Temporal.PlainDate(2020, 4, 16),
  [MagicSet.AMONKHET]: new Temporal.PlainDate(2020, 8, 13),
  [MagicSet.KALADESH]: new Temporal.PlainDate(2020, 11, 12),
  [MagicSet.ARENA_CUBE]: new Temporal.PlainDate(2022, 1, 6),
  [MagicSet.DOUBLE_FEATURE]: new Temporal.PlainDate(2022, 1, 28),
};

export const DECK_LABELS: Record<Deck, string> = {
  [Deck.ALL]: "All decks",
  [Deck.WHITE_BLUE]: "Azorius",
  [Deck.BLUE_BLACK]: "Dimir",
  [Deck.BLACK_RED]: "Rakdos",
  [Deck.RED_GREEN]: "Gruul",
  [Deck.WHITE_GREEN]: "Selesnya",
  [Deck.WHITE_BLACK]: "Orzhov",
  [Deck.BLUE_RED]: "Izzet",
  [Deck.BLACK_GREEN]: "Golgari",
  [Deck.WHITE_RED]: "Boros",
  [Deck.BLUE_GREEN]: "Simic",
};

export const DECK_COLORS: Record<Deck, Column[]> = {
  [Deck.ALL]: [],
  [Deck.WHITE_BLUE]: [Column.WHITE, Column.BLUE],
  [Deck.BLUE_BLACK]: [Column.BLUE, Column.BLACK],
  [Deck.BLACK_RED]: [Column.BLACK, Column.RED],
  [Deck.RED_GREEN]: [Column.RED, Column.GREEN],
  [Deck.WHITE_GREEN]: [Column.WHITE, Column.GREEN],
  [Deck.WHITE_BLACK]: [Column.WHITE, Column.BLACK],
  [Deck.BLUE_RED]: [Column.BLUE, Column.RED],
  [Deck.BLACK_GREEN]: [Column.BLACK, Column.GREEN],
  [Deck.WHITE_RED]: [Column.WHITE, Column.RED],
  [Deck.BLUE_GREEN]: [Column.BLUE, Column.GREEN],
};

export const LOCAL_STORAGE_HIDE_BANNER_KEY = "hideBanner";
export const LOCAL_STORAGE_HIDE_BANNER_VALUE = "true";
