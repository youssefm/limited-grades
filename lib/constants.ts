import { CardType, Column, Deck, Grade, MagicSet, Rarity } from "lib/types";

export const ALL_SETS = Object.values(MagicSet);
export const ALL_DECKS = Object.values(Deck);
export const ALL_COLUMNS = Object.values(Column);
export const ALL_GRADES = Object.values(Grade);
export const ALL_RARITIES = Object.values(Rarity);
export const ALL_CARD_TYPES = Object.values(CardType);

export const SET_LABELS: Record<MagicSet, string> = {
  [MagicSet.NEON_DYNASTY]: "Neon Dynasty",
  [MagicSet.CRIMSON_VOW]: "Crimson Vow",
  [MagicSet.MIDNIGHT_HUNT]: "Midnight Hunt",
  [MagicSet.FORGOTTEN_REALM]: "Forgotten Realms",
  [MagicSet.STRIXHAVEN]: "Strixhaven",
  [MagicSet.KALDHEIM]: "Kaldheim",
  [MagicSet.ZENDIKAR]: "Zendikar Rising",
  [MagicSet.IKORIA]: "Ikoria",
  [MagicSet.WAR_OF_THE_SPARK]: "War of the Spark",
  [MagicSet.RAVNICA_ALLEGIANCE]: "Ravnica Allegiance",
  [MagicSet.GUILDS_OF_RAVNICA]: "Guilds of Ravnica",
  [MagicSet.DOMINARIA]: "Dominaria",
  [MagicSet.AMONKHET]: "Amonkhet",
  [MagicSet.KALADESH]: "Kaladesh",
  [MagicSet.ARENA_CUBE]: "Arena Cube",
  [MagicSet.DOUBLE_FEATURE]: "Double Feature",
};

export const COLUMN_ICONS: Record<Column, string> = {
  [Column.WHITE]: "ms ms-w ms-cost",
  [Column.BLUE]: "ms ms-u ms-cost",
  [Column.BLACK]: "ms ms-b ms-cost",
  [Column.RED]: "ms ms-r ms-cost",
  [Column.GREEN]: "ms ms-g ms-cost",
  [Column.MULTICOLOR]:
    "ms ms-multicolor ms-duo ms-duo-color ms-grad scale-[1.44]",
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

export const DECK_COLORS: Record<Deck, Column[]> = {
  [Deck.ALL]: [],
  [Deck.WHITE_BLUE]: [Column.WHITE, Column.BLUE],
  [Deck.BLUE_BLACK]: [Column.BLUE, Column.BLACK],
  [Deck.BLACK_RED]: [Column.BLACK, Column.RED],
  [Deck.RED_GREEN]: [Column.RED, Column.GREEN],
  [Deck.WHITE_GREEN]: [Column.WHITE, Column.GREEN],
  [Deck.WHITE_BLACK]: [Column.WHITE, Column.BLACK],
  [Deck.BLUE_RED]: [Column.BLUE, Column.RED],
  [Deck.BLACK_GREEN]: [Column.BLACK, Column.GREEN],
  [Deck.WHITE_RED]: [Column.WHITE, Column.RED],
  [Deck.BLUE_GREEN]: [Column.BLUE, Column.GREEN],
};

export const GRADE_BG_COLORS: Record<Grade, string> = {
  [Grade.A_PLUS]: "bg-A+",
  [Grade.A]: "bg-A",
  [Grade.A_MINUS]: "bg-A-",
  [Grade.B_PLUS]: "bg-B+",
  [Grade.B]: "bg-B",
  [Grade.B_MINUS]: "bg-B-",
  [Grade.C_PLUS]: "bg-C+",
  [Grade.C]: "bg-C",
  [Grade.C_MINUS]: "bg-C-",
  [Grade.D_PLUS]: "bg-D+",
  [Grade.D]: "bg-D",
  [Grade.D_MINUS]: "bg-D-",
  [Grade.F]: "bg-F",
};

export const GRADE_BORDER_COLORS: Record<Grade, string> = {
  [Grade.A_PLUS]: "border-A+",
  [Grade.A]: "border-A",
  [Grade.A_MINUS]: "border-A-",
  [Grade.B_PLUS]: "border-B+",
  [Grade.B]: "border-B",
  [Grade.B_MINUS]: "border-B-",
  [Grade.C_PLUS]: "border-C+",
  [Grade.C]: "border-C",
  [Grade.C_MINUS]: "border-C-",
  [Grade.D_PLUS]: "border-D+",
  [Grade.D]: "border-D",
  [Grade.D_MINUS]: "border-D-",
  [Grade.F]: "border-F",
};
