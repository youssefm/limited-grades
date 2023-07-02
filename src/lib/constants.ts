import { CardType, Color, Grade, Rarity } from "./types";

export const ALL_COLORS = Object.values(Color);
export const ALL_GRADES = Object.values(Grade);
export const ALL_RARITIES = Object.values(Rarity);
export const ALL_CARD_TYPES = Object.values(CardType);

export const LOCAL_STORAGE_HIDE_BANNER_KEY = "hideBanner";
export const LOCAL_STORAGE_HIDE_BANNER_VALUE = "true";

export const MINUTE_IN_SECONDS = 60;
export const HOUR_IN_SECONDS = 60 * MINUTE_IN_SECONDS;
export const DAY_IN_SECONDS = 24 * HOUR_IN_SECONDS;
