import { NextApiRequest, NextApiResponse } from "next";

import { ADMIN_ACTION_KEYS } from "lib/admin";

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  response.status(200).json(ADMIN_ACTION_KEYS);
};

export default handler;
