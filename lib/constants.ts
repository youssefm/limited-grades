import { Column, Deck, MagicSet } from "lib/types";

export const LATEST_SET = MagicSet.CRIMSON_VOW;

export const SET_LABELS: Record<MagicSet, string> = {
  [MagicSet.CRIMSON_VOW]: "Crimson Vow",
};

export const COLUMN_ICONS: Record<Column, string> = {
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
};

export const DECK_COLORS: Record<Deck, Column[]> = {
  [Deck.ALL]: [],
};
