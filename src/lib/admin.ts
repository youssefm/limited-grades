import { FILE_CACHE, REDIS_CACHE } from "./cache";
import MagicSet from "./MagicSet";
import { fetchScryfallIndex, SCRYFALL_FILE_INDEX } from "./scryfall";

export const ACTIONS: Record<string, (output: any[]) => Promise<void>> =
  process.env.ADMIN_ENABLED === "true"
    ? {
        "clear-redis-cache": async (output) => {
          await REDIS_CACHE.clear();
          output.push("Redis cache cleared!");
        },
        "fetch-scryfall-card": async (output) => {
          const index = await fetchScryfallIndex(MagicSet.MIDNIGHT_HUNT);
          const card = index.lookupCard("Organ Hoarder");
          output.push(card);
        },
        "lookup-scryfall-card": async (output) => {
          const index = await SCRYFALL_FILE_INDEX.get();
          const card = index.lookupCard("Organ Hoarder");
          output.push(card);
        },
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
      }
    : {};

export const ACTION_KEYS = Object.keys(ACTIONS);
