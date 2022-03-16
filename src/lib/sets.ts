import { addDays, isFuture, parseISO } from "date-fns";

import { SET_START_DATES } from "lib/constants";
import { MagicSet } from "lib/types";

const RECENT_SET_THRESHOLD_IN_DAYS = 30;
const EMBARGO_DURATION_IN_DAYS = 12;

export const isRecentSet = (set: MagicSet) =>
  isFuture(
    addDays(parseISO(SET_START_DATES[set]), RECENT_SET_THRESHOLD_IN_DAYS)
  );

export const isSetUnderEmbargo = (set: MagicSet) =>
  isFuture(addDays(parseISO(SET_START_DATES[set]), EMBARGO_DURATION_IN_DAYS));
