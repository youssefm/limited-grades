import { Column, Tier, Rarity, Deck, Set } from "./types";

export const TIER_THRESHOLDS: [Tier, number][] = [
  [Tier.A_PLUS, 99],
  [Tier.A, 95],
  [Tier.A_MINUS, 90],
  [Tier.B_PLUS, 85],
  [Tier.B, 76],
  [Tier.B_MINUS, 68],
  [Tier.C_PLUS, 56],
  [Tier.C, 43],
  [Tier.C_MINUS, 34],
  [Tier.D_PLUS, 25],
  [Tier.D, 16],
  [Tier.D_MINUS, 5],
  [Tier.F, 0],
];

export const COLUMNS_BY_COLOR: { [key in string]: Column } = {
  W: Column.WHITE,
  U: Column.BLUE,
  B: Column.BLACK,
  R: Column.RED,
  G: Column.GREEN,
};

export const RARITY_SORT_KEY: Record<Rarity, number> = {
  [Rarity.COMMON]: 3,
  [Rarity.UNCOMMON]: 2,
  [Rarity.RARE]: 1,
  [Rarity.MYTHIC]: 0,
};

export const DECK_LABELS: Record<Deck, string> = {
  [Deck.ALL]: "All decks",
  [Deck.WHITE_BLUE]: "Azorius (WU)",
  [Deck.BLUE_BLACK]: "Dimir (UB)",
  [Deck.BLACK_RED]: "Rakdos (BR)",
  [Deck.RED_GREEN]: "Gruul (RG)",
  [Deck.WHITE_GREEN]: "Selesnya (WG)",
  [Deck.WHITE_BLACK]: "Orzhov (WB)",
  [Deck.BLUE_RED]: "Izzet (UR)",
  [Deck.BLACK_GREEN]: "Golgari (BG)",
  [Deck.WHITE_RED]: "Boros (WR)",
  [Deck.BLUE_GREEN]: "Simic (UG)",
};

export const SET_LABELS: Record<Set, string> = {
  [Set.CRIMSON_VOW]: "Crimson Vow",
  [Set.MIDNIGHT_HUNT]: "Midnight Hunt",
  [Set.FORGOTTEN_REALM]: "Forgotten Realms",
  [Set.STRIXHAVEN]: "Strixhaven",
  [Set.KALDHEIM]: "Kaldheim",
  [Set.ZENDIKAR]: "Zendikar Rising",
  [Set.IKORIA]: "Ikoria",
  [Set.WAR_OF_THE_SPARK]: "War of the Spark",
  [Set.RAVNICA_ALLEGIANCE]: "Ravnica Allegiance",
  [Set.GUILDS_OF_RAVNICA]: "Guilds of Ravnica",
  [Set.DOMINARIA]: "Dominaria",
  [Set.AMONKHET]: "Amonkhet",
  [Set.KALADESH]: "Kaladesh",
};
