import { FILE_CACHE, REDIS_CACHE, REDIS_CLIENT } from "./cache";
import getCardStore from "./getCardStore";
import MagicSet from "./MagicSet";
import { generateIndexFile } from "./scryfall";

const ACTIONS: Record<string, (output: any[]) => Promise<void>> = {
  "check-redis-keys": async (output) => {
    const client = await REDIS_CLIENT.get();
    for (const set of MagicSet.ALL) {
      const exists = await client.exists(set.code);
      output.push(
        `${set.code.toUpperCase()}: ${exists ? "Cached" : "Not Cached"}`
      );
    }
  },
  "clear-redis-cache": async (output) => {
    await REDIS_CACHE.clear();
    output.push("Redis cache cleared!");
  },
  "delete-snc-cache": async (output) => {
    const client = await REDIS_CLIENT.get();
    await client.del("snc");
    output.push("SNC cache value deleted!");
  },
  "generate-scryfall-index": async (output) => {
    await generateIndexFile();
    output.push(`Scryfall index generated!`);
  },
  "populate-redis-cache": async (output) => {
    for (const set of MagicSet.ALL) {
      await getCardStore(set, REDIS_CACHE);
      output.push(`${set.code.toUpperCase()}: Cache Populated`);
    }
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
};

export const ADMIN_ACTIONS =
  process.env.ADMIN_ENABLED === "true" ? ACTIONS : {};

export const ADMIN_ACTION_KEYS = Object.keys(ADMIN_ACTIONS);
