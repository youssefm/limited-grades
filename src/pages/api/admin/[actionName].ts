import { NextApiRequest, NextApiResponse } from "next";

import { ACTIONS } from "lib/admin";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { actionName } = request.query;

  const action = ACTIONS[actionName as string];
  if (!action || process.env.NEXT_PUBLIC_ADMIN_ENABLED !== "true") {
    response.status(404).send(null);
    return;
  }

  const output: string[] = [];
  try {
    await action(output);
  } catch (error: any) {
    output.push(`ERROR: ${error.message}`);
    response.status(500).json({ output });
    return;
  }
  response.status(200).json({ output });
};

export default handler;
