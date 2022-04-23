import { NextApiRequest, NextApiResponse } from "next";

import { ACTION_KEYS } from "lib/admin";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  response.status(200).json(ACTION_KEYS);
};

export default handler;
