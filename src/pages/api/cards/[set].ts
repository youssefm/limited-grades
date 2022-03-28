import { NextApiRequest, NextApiResponse } from "next";

import { getCardStore } from "lib/cards";
import { ALL_SETS } from "lib/constants";
import { MagicSet } from "lib/types";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { set } = request.query;

  if (!(ALL_SETS as string[]).includes(set as string)) {
    response.status(404).json({ error: "set not recognized" });
    return;
  }

  const cardStore = await getCardStore(set as MagicSet);
  response.status(200).json(cardStore);
};

export default handler;

export const config = {
  unstable_includeFiles: ["data/scryfall-oracle-cards.json"],
};
