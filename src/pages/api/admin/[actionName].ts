import { NextApiRequest, NextApiResponse } from "next";

import { FILE_CACHE, REDIS_CACHE } from "lib/cache";
import MagicSet from "lib/MagicSet";

const ACTIONS: Record<string, () => Promise<void>> = {
  "update-file-cache": async () => {
    for (const set of MagicSet.ALL) {
      const cardStore = await REDIS_CACHE.get(set.code);
      if (cardStore) {
        console.log(`Updating file cache for ${set.code.toUpperCase()}`);
        await FILE_CACHE.set(set.code, cardStore);
      }
    }
    console.log("Done updating all file caches!");
  },
};

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { actionName } = request.query;

  const action = ACTIONS[actionName as string];
  if (!action || process.env.NEXT_PUBLIC_ADMIN_ENABLED !== "true") {
    response.status(404).send(null);
    return;
  }

  await action();
  response
    .status(200)
    .setHeader("Content-Type", "text/plain; charset=utf-8")
    .send(`Admin action "${actionName}" succeeded`);
};

export default handler;
