import { NextApiRequest, NextApiResponse } from "next";

import ADMIN_ACTIONS from "lib/admin";

const IS_ADMIN_ENABLED = process.env.ADMIN_ENABLED === "true";

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  const keys = IS_ADMIN_ENABLED ? Object.keys(ADMIN_ACTIONS) : [];
  response.status(200).json(keys);
};

export default handler;
