import { FILE_CACHE, REDIS_CACHE } from "lib/cache";
import MagicSet from "lib/MagicSet";

const main = async () => {
  for (const set of MagicSet.ALL) {
    const cardStore = await REDIS_CACHE.get(set.code);
    if (cardStore) {
      console.log(`Updating file cache for ${set.code.toUpperCase()}`);
      await FILE_CACHE.set(set.code, cardStore);
    }
  }
  console.log("Done updating all file caches!");
};

main().catch((error) => {
  console.log(error);
});
