import { Column, Tier, Rarity } from "./types";

export const TIER_THRESHOLDS: [Tier, number][] = [
  [Tier.A_PLUS, 99],
  [Tier.A, 95],
  [Tier.A_MINUS, 90],
  [Tier.B_PLUS, 85],
  [Tier.B, 76],
  [Tier.B_MINUS, 68],
  [Tier.C_PLUS, 57],
  [Tier.C, 45],
  [Tier.C_MINUS, 36],
  [Tier.D_PLUS, 27],
  [Tier.D, 17],
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

export const COLUMN_ICONS = {
  [Column.WHITE]: "ms ms-w ms-cost",
  [Column.BLUE]: "ms ms-u ms-cost",
  [Column.BLACK]: "ms ms-b ms-cost",
  [Column.RED]: "ms ms-r ms-cost",
  [Column.GREEN]: "ms ms-g ms-cost",
  [Column.MULTICOLOR]: "ms ms-multicolor ms-duo ms-duo-color ms-grad",
  [Column.COLORLESS]: "ms ms-c ms-cost",
};
