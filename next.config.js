/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ["c1.scryfall.com"],
  },
  outputFileTracing: true,
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/vow",
        permanent: false,
      },
      {
        source: "/:set/(all|wu|ub|br|rg|wg|wb|ur|bg|wr|ug)",
        destination: "/:set",
        permanent: false,
      },
    ];
  },
};
