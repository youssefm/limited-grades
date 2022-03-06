/** @type {import('next').NextConfig} */
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
    const umamiServerName = process.env.UMAMI_SERVER_NAME;
    if (umamiServerName) {
      rewrites.push({
        source: "/u.js",
        destination: `https://${umamiServerName}/umami.js`,
      });
      rewrites.push({
        source: "/api/collect",
        destination: `https://${umamiServerName}/api/collect`,
      });
    }
    return rewrites;
  },
};
