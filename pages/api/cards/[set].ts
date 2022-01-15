import type { NextApiRequest, NextApiResponse } from "next";

import { getCards } from "lib/cards";
import { MagicSet } from "lib/types";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { set } = request.query;

  if (!(Object.values(MagicSet) as string[]).includes(set as string)) {
    response.status(404).json({ error: "set not recognized" });
    return;
  }

  const cards = await getCards(set as MagicSet);
  response.status(200).json(cards);
}

export const config = {
  unstable_includeFiles: ["data/oracle-cards.json"],
};
