import { Column, Tier, Rarity, Deck } from "./types";

export const TIER_THRESHOLDS: [Tier, number][] = [
  [Tier.A_PLUS, 99.5],
  [Tier.A, 95],
  [Tier.A_MINUS, 90],
  [Tier.B_PLUS, 80],
  [Tier.B, 65],
  [Tier.B_MINUS, 55],
  [Tier.C_PLUS, 45],
  [Tier.C, 35],
  [Tier.C_MINUS, 30],
  [Tier.D_PLUS, 25],
  [Tier.D, 15],
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
  [Deck.BLACK_GREEN]: "Golgari (BG)",
  [Deck.BLUE_GREEN]: "Simic (UG)",
  [Deck.BLUE_RED]: "Izzet (UR)",
  [Deck.WHITE_RED]: "Boros (WR)",
};
