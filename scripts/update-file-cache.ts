import { loadEnvConfig } from "@next/env";

import { FILE_CACHE, REDIS_CACHE } from "lib/cache";
import MagicSet from "lib/sets";

const main = async () => {
  loadEnvConfig(process.cwd());
  for (const set of MagicSet.ALL) {
    const cardStore = await REDIS_CACHE.get(set.code);
    if (cardStore) {
      console.log(`Updating file cache for ${set.code.toUpperCase()}`);
      await FILE_CACHE.set(set.code, cardStore);
    }
  }
  await REDIS_CACHE.close();
  console.log("Done updating all file caches!");
};

main().catch((error) => {
  console.log(error);
});
