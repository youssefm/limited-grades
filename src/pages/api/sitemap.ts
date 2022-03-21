import { NextApiRequest, NextApiResponse } from "next";

import { ALL_SETS } from "lib/constants";

const BASE_URL = "https://www.limitedgrades.com";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const urls = [BASE_URL].concat(ALL_SETS.map((set) => `${BASE_URL}/${set}`));

  response
    .status(200)
    .setHeader("Content-Type", "text/plain")
    .send(urls.join("\n"));
};

export default handler;
