import { Column, Deck, Grade, Rarity } from "./types";

export const GRADE_THRESHOLDS: [Grade, number][] = [
  [Grade.A_PLUS, 99],
  [Grade.A, 95],
  [Grade.A_MINUS, 90],
  [Grade.B_PLUS, 85],
  [Grade.B, 76],
  [Grade.B_MINUS, 68],
  [Grade.C_PLUS, 57],
  [Grade.C, 45],
  [Grade.C_MINUS, 36],
  [Grade.D_PLUS, 27],
  [Grade.D, 17],
  [Grade.D_MINUS, 5],
  [Grade.F, 0],
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

export const COLUMN_ICONS = {
  [Column.WHITE]: "ms ms-w ms-cost",
  [Column.BLUE]: "ms ms-u ms-cost",
  [Column.BLACK]: "ms ms-b ms-cost",
  [Column.RED]: "ms ms-r ms-cost",
  [Column.GREEN]: "ms ms-g ms-cost",
  [Column.MULTICOLOR]: "ms ms-multicolor ms-duo ms-duo-color ms-grad",
  [Column.COLORLESS]: "ms ms-c ms-cost",
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
