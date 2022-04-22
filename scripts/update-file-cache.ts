import { loadEnvConfig } from "@next/env";

import { FILE_CACHE, REDIS_CACHE } from "lib/cache";
import { ALL_SETS } from "lib/constants";

const main = async () => {
  loadEnvConfig(process.cwd());
  for (const set of ALL_SETS) {
    const cardStore = await REDIS_CACHE.get(set);
    if (cardStore) {
      console.log("Updating file cache for", set.toUpperCase());
      await FILE_CACHE.set(set, cardStore);
    }
  }
  await REDIS_CACHE.close();
  console.log("Done updating all file caches!");
};

main().catch((error) => {
  console.log(error);
});
