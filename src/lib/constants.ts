import { CardType, Color, Deck, Grade, MagicSet, Rarity } from "lib/types";

export const ALL_SETS = Object.values(MagicSet);
export const ALL_COLORS = Object.values(Color);
export const ALL_GRADES = Object.values(Grade);
export const ALL_RARITIES = Object.values(Rarity);
export const ALL_CARD_TYPES = Object.values(CardType);

export const SET_LABELS: Record<MagicSet, string> = {
  [MagicSet.NEW_CAPENNA]: "New Capenna",
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

export const SET_START_DATES: Record<MagicSet, string> = {
  [MagicSet.NEW_CAPENNA]: "2022-04-28",
  [MagicSet.NEON_DYNASTY]: "2022-02-10",
  [MagicSet.CRIMSON_VOW]: "2021-11-11",
  [MagicSet.MIDNIGHT_HUNT]: "2021-09-16",
  [MagicSet.FORGOTTEN_REALM]: "2021-07-08",
  [MagicSet.STRIXHAVEN]: "2021-04-15",
  [MagicSet.KALDHEIM]: "2021-01-28",
  [MagicSet.ZENDIKAR]: "2020-09-17",
  [MagicSet.IKORIA]: "2020-04-16",
  [MagicSet.WAR_OF_THE_SPARK]: "2020-04-16",
  [MagicSet.RAVNICA_ALLEGIANCE]: "2020-04-16",
  [MagicSet.GUILDS_OF_RAVNICA]: "2020-04-16",
  [MagicSet.DOMINARIA]: "2020-04-16",
  [MagicSet.AMONKHET]: "2020-08-13",
  [MagicSet.KALADESH]: "2020-11-12",
  [MagicSet.ARENA_CUBE]: "2022-01-06",
  [MagicSet.DOUBLE_FEATURE]: "2022-01-28",
};

export const DECK_LABELS: Record<Deck, string> = {
  [Deck.ALL]: "All decks",
  [Deck.AZORIUS]: "Azorius",
  [Deck.DIMIR]: "Dimir",
  [Deck.RAKDOS]: "Rakdos",
  [Deck.GRUUL]: "Gruul",
  [Deck.SELESNYA]: "Selesnya",
  [Deck.ORZHOV]: "Orzhov",
  [Deck.IZZET]: "Izzet",
  [Deck.GOLGARI]: "Golgari",
  [Deck.BOROS]: "Boros",
  [Deck.SIMIC]: "Simic",
};

export const DECK_COLORS: Record<Deck, Color[]> = {
  [Deck.ALL]: [],
  [Deck.AZORIUS]: [Color.WHITE, Color.BLUE],
  [Deck.DIMIR]: [Color.BLUE, Color.BLACK],
  [Deck.RAKDOS]: [Color.BLACK, Color.RED],
  [Deck.GRUUL]: [Color.RED, Color.GREEN],
  [Deck.SELESNYA]: [Color.GREEN, Color.WHITE],
  [Deck.ORZHOV]: [Color.WHITE, Color.BLACK],
  [Deck.IZZET]: [Color.BLUE, Color.RED],
  [Deck.GOLGARI]: [Color.BLACK, Color.GREEN],
  [Deck.BOROS]: [Color.RED, Color.WHITE],
  [Deck.SIMIC]: [Color.GREEN, Color.BLUE],
};

export const LOCAL_STORAGE_HIDE_BANNER_KEY = "hideBanner";
export const LOCAL_STORAGE_HIDE_BANNER_VALUE = "true";
