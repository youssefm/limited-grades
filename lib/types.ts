export enum MagicSet {
  CRIMSON_VOW = "vow",
  MIDNIGHT_HUNT = "mid",
  FORGOTTEN_REALM = "afr",
  STRIXHAVEN = "stx",
  KALDHEIM = "khm",
  ZENDIKAR = "znr",
  IKORIA = "iko",
  WAR_OF_THE_SPARK = "war",
  RAVNICA_ALLEGIANCE = "rna",
  GUILDS_OF_RAVNICA = "grn",
  DOMINARIA = "dom",
  AMONKHET = "akr",
  KALADESH = "klr",
}

export enum Deck {
  ALL = "all",
  WHITE_BLUE = "wu",
  BLUE_BLACK = "ub",
  BLACK_RED = "br",
  RED_GREEN = "rg",
  WHITE_GREEN = "wg",
  WHITE_BLACK = "wb",
  BLUE_RED = "ur",
  BLACK_GREEN = "bg",
  WHITE_RED = "wr",
  BLUE_GREEN = "ug",
}

export interface ApiCard {
  name: string;
  drawn_improvement_win_rate: number;
  ever_drawn_game_count: number;
  ever_drawn_win_rate: number;
  game_count: number;
  rarity: Rarity | "basic";
  url: string;
  url_back: string;
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
  cardTypes: Set<CardType>;
  cardUrl: string;
  cardBackUrl: string;
  stats: Partial<Record<Deck, CardStats>>;
}

interface CardStats {
  winrate: number;
  improvementWhenDrawn: number;
  gameCount: number;
  score: number;
  grade: Grade;
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
