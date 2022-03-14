import { addDays, isFuture, parseISO } from "date-fns";

import { SET_START_DATES } from "lib/constants";
import { MagicSet } from "lib/types";

// eslint-disable-next-line import/prefer-default-export
export const isRecentSet = (set: MagicSet) =>
  isFuture(addDays(parseISO(SET_START_DATES[set]), 30));
