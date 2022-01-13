import type { NextApiRequest, NextApiResponse } from "next";
import { getCards } from "../../../lib/cards";
import { MagicSet } from "../../../lib/types";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { set } = request.query;

  // Temporarily disabling this
  // getCards currently throws exceptions in production because the data files are not available
  response.status(503).json({ error: "not available" });
  return;

  if (!(Object.values(MagicSet) as string[]).includes(set as string)) {
    response.status(404).json({ error: "set not recognized" });
    return;
  }

  const cards = await getCards(set as MagicSet);
  response.status(200).json(cards);
}
