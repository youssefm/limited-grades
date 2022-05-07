import { NextApiRequest, NextApiResponse } from "next";

import { ADMIN_ACTION_KEYS } from "lib/admin";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  response.status(200).json(ADMIN_ACTION_KEYS);
};

export default handler;
