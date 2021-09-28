export enum Expansion {
  MIDNIGHT_HUNT = "mid",
  // FORGOTTEN_REALM = "afr",
  // STRIXHAVEN = "stx",
  // KALDHEIM = "khm",
}

export enum Deck {
  ALL = "all",
  WHITE_BLUE = "wu",
  BLUE_BLACK = "ub",
  BLACK_RED = "br",
  RED_GREEN = "rg",
  WHITE_GREEN = "wg",
  WHITE_BLACK = "wb",
  BLACK_GREEN = "bg",
  BLUE_GREEN = "ug",
  BLUE_RED = "ur",
  WHITE_RED = "wr",
}

export interface ApiCard {
  name: string;
  color: string;
  drawn_improvement_win_rate: number;
  game_count: number;
  rarity: Rarity;
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

export enum Tier {
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
  grade: number;
  tier: Tier;
  rarity: Rarity;
}
