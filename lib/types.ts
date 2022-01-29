export enum MagicSet {
  CRIMSON_VOW = "vow",
}

export enum Column {
  WHITE = "white",
  BLUE = "blue",
  BLACK = "black",
  RED = "red",
  GREEN = "green",
  MULTICOLOR = "multicolor",
  COLORLESS = "colorless",
}

export enum Grade {
  A_PLUS = "A+",
  A = "A",
  A_MINUS = "A-",
  B_PLUS = "B+",
  B = "B",
  B_MINUS = "B-",
  C_PLUS = "C+",
  C = "C",
  C_MINUS = "C-",
  D_PLUS = "D+",
  D = "D",
  D_MINUS = "D-",
  F = "F",
}

export enum Rarity {
  COMMON = "common",
  UNCOMMON = "uncommon",
  RARE = "rare",
  MYTHIC = "mythic",
}

export interface Card {
  name: string;
  column: Column;
  rarity: Rarity;
  cardTypes: CardType[];
  cardUrl: string;
  cardBackUrl: string;
  winrate: number;
  gameCount: number;
  grade: Grade;
  guessedGrade: Grade;
  diff: number;
  diffSvg: string;
}

export enum CardType {
  CREATURE = "creature",
  INSTANT = "instant",
  SORCERY = "sorcery",
  ARTIFACT = "artifact",
  ENCHANTMENT = "enchantment",
  PLANESWALKER = "planeswalker",
  LAND = "land",
}
