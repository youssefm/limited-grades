import { NextApiRequest, NextApiResponse } from "next";

import getCardStore from "lib/getCardStore";
import MagicSet from "lib/MagicSet";

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  const { setCode } = request.query;

  const set = MagicSet.lookup(setCode as string);
  if (!set) {
    response.status(404).json({ error: "set not recognized" });
    return;
  }

  const cardStore = await getCardStore(set);
  response.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=600"
  );
  response.status(200).json(cardStore);
};

export default handler;
