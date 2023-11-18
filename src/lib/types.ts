export enum Format {
  PREMIER_DRAFT = "PremierDraft",
  TRADITIONAL_DRAFT = "TradDraft",
}

export enum Color {
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
  color: Color;
  rarity: Rarity;
  cardTypes: CardType[];
  cardUrl: string;
  cardBackUrl: string;
  overallStats: OverallCardStats;
  stats: Record<string, CardStats>;
}

export interface CardStats {
  winrate: number;
  gameCount: number;
  grade: Grade;
  score: number;
}

export interface OverallCardStats {
  gameCount: number;
  lastSeenAt: number | null;
  takenAt: number | null;
  playedWinrate: number | null;
  openingHandWinrate: number | null;
  drawnWinrate: number | null;
  notDrawnWinrate: number | null;
}

export enum CardType {
  CREATURE = "creature",
  INSTANT = "instant",
  SORCERY = "sorcery",
  ARTIFACT = "artifact",
  ENCHANTMENT = "enchantment",
  BATTLE = "battle",
  PLANESWALKER = "planeswalker",
  LAND = "land",
}

export interface CardStore {
  updatedAt: Date;
  cards: Card[];
}
