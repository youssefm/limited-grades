import { Card } from "./types";

export enum ManaValue {
  ONE = "1",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
  SIX_PLUS = "6+",
}

export const ALL_MANA_VALUES = Object.values(ManaValue);

export const MANA_VALUE_CHARACTER_MAP: Record<ManaValue, string> = {
  [ManaValue.ONE]: "1",
  [ManaValue.TWO]: "2",
  [ManaValue.THREE]: "3",
  [ManaValue.FOUR]: "4",
  [ManaValue.FIVE]: "5",
  [ManaValue.SIX_PLUS]: "6",
};

export function getCardManaValue(card: Card): ManaValue | null {
  if (card.manaValue < 1) {
    return null;
  }
  if (card.manaValue === 1) {
    return ManaValue.ONE;
  }
  if (card.manaValue === 2) {
    return ManaValue.TWO;
  }
  if (card.manaValue === 3) {
    return ManaValue.THREE;
  }
  if (card.manaValue === 4) {
    return ManaValue.FOUR;
  }
  if (card.manaValue === 5) {
    return ManaValue.FIVE;
  }
  return ManaValue.SIX_PLUS;
}
