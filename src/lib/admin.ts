import { FILE_CACHE, REDIS_CACHE } from "lib/cache";
import MagicSet from "lib/MagicSet";

export const ACTIONS: Record<string, (output: string[]) => Promise<void>> = {
  "update-file-cache": async (output) => {
    for (const set of MagicSet.ALL) {
      const cardStore = await REDIS_CACHE.get(set.code);
      if (cardStore) {
        output.push(`Updating file cache for ${set.code.toUpperCase()}`);
        await FILE_CACHE.set(set.code, cardStore);
      }
    }
    output.push("Done updating all file caches!");
  },
};

export const ACTION_KEYS = Object.keys(ACTIONS);
