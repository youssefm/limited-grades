import { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";

import { IS_UMAMI_ENABLED, UMAMI_SERVER_NAME } from "lib/env";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (!IS_UMAMI_ENABLED) {
    response.status(404).send(null);
    return;
  }

  await httpProxyMiddleware(request, response, {
    target: `https://${UMAMI_SERVER_NAME}`,
  });
};

export default handler;
