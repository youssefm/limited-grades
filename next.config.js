/** @type {import('next').NextConfig} */

const { UMAMI_SERVER_NAME } = process.env;

module.exports = {
  outputFileTracing: true,
  reactStrictMode: true,
  redirects: async () => [
    {
      source: "/",
      destination: "/neo",
      permanent: false,
    },
    {
      source: "/:set/(all|wu|ub|br|rg|wg|wb|ur|bg|wr|ug)",
      destination: "/:set",
      permanent: false,
    },
  ],
  rewrites: async () => {
    const rewrites = [];
    if (UMAMI_SERVER_NAME) {
      rewrites.push({
        source: "/u.js",
        destination: `https://${UMAMI_SERVER_NAME}/umami.js`,
      });
      rewrites.push({
        source: "/api/collect",
        destination: `https://${UMAMI_SERVER_NAME}/api/collect`,
      });
    }
    return rewrites;
  },
};
