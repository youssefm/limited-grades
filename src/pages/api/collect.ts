import { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";

const { UMAMI_SERVER_NAME } = process.env;

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (!UMAMI_SERVER_NAME) {
    response.status(404).send(null);
    return;
  }

  await httpProxyMiddleware(request, response, {
    target: `https://${UMAMI_SERVER_NAME}`,
  });
};

export default handler;
