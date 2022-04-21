import { loadEnvConfig } from "@next/env";

import { FILE_CACHE, REDIS_CACHE } from "lib/cache";
import { ALL_SETS } from "lib/constants";

const main = async () => {
  loadEnvConfig(process.cwd());
  for (const set of ALL_SETS) {
    await FILE_CACHE.set(set, await REDIS_CACHE.get(set));
  }
};

main().catch((error) => {
  console.log(error);
});
