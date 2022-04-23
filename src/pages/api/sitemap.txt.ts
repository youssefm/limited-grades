import { NextApiRequest, NextApiResponse } from "next";

import MagicSet from "lib/MagicSet";

const BASE_URL = "https://www.limitedgrades.com";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const urls = [BASE_URL].concat(
    MagicSet.ALL.map((set) => `${BASE_URL}/${set.code}`)
  );

  response
    .status(200)
    .setHeader("Content-Type", "text/plain; charset=utf-8")
    .send(urls.join("\n"));
};

export default handler;
