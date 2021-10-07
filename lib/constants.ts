import { Column, Tier, Rarity, Deck, Expansion } from "./types";

export const TIER_THRESHOLDS: [Tier, number][] = [
  [Tier.A_PLUS, 99],
  [Tier.A, 95],
  [Tier.A_MINUS, 90],
  [Tier.B_PLUS, 85],
  [Tier.B, 75],
  [Tier.B_MINUS, 70],
  [Tier.C_PLUS, 60],
  [Tier.C, 50],
  [Tier.C_MINUS, 40],
  [Tier.D_PLUS, 30],
  [Tier.D, 20],
  [Tier.D_MINUS, 10],
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
  [Deck.BLACK_GREEN]: "Golgari (BG)",
  [Deck.BLUE_GREEN]: "Simic (UG)",
  [Deck.BLUE_RED]: "Izzet (UR)",
  [Deck.WHITE_RED]: "Boros (WR)",
};

export const EXPANSION_LABELS: Record<Expansion, string> = {
  [Expansion.MIDNIGHT_HUNT]: "Midnight Hunt",
  [Expansion.FORGOTTEN_REALM]: "Forgotten Realms",
  [Expansion.STRIXHAVEN]: "Strixhaven",
  [Expansion.KALDHEIM]: "Kaldheim",
  [Expansion.ZENDIKAR]: "Zendikar Rising",
  [Expansion.IKORIA]: "Ikoria",
  [Expansion.WAR_OF_THE_SPARK]: "War of the Spark",
  [Expansion.RAVNICA_ALLEGIANCE]: "Ravnica Allegiance",
  [Expansion.GUILDS_OF_RAVNICA]: "Guilds of Ravnica",
  [Expansion.DOMINARIA]: "Dominaria",
  [Expansion.AMONKHET]: "Amonkhet",
  [Expansion.KALADESH]: "Kaladesh",
};
