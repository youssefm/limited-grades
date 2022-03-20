import { Temporal } from "@js-temporal/polyfill";

import { SET_START_DATES } from "lib/constants";
import { MagicSet } from "lib/types";

const RECENT_SET_THRESHOLD_IN_DAYS = 30;
const EMBARGO_DURATION_IN_DAYS = 12;

const computeDaysSinceDate = (date: Temporal.PlainDate) =>
  Temporal.Now.plainDateISO("UTC").since(date).total("day");

export const isRecentSet = (set: MagicSet) =>
  computeDaysSinceDate(SET_START_DATES[set]) < RECENT_SET_THRESHOLD_IN_DAYS;

export const isSetUnderEmbargo = (set: MagicSet) =>
  computeDaysSinceDate(SET_START_DATES[set]) < EMBARGO_DURATION_IN_DAYS;
