/** @type {import('next').NextConfig} */
module.exports = {
  output: "standalone",
  outputFileTracing: true,
  reactStrictMode: true,
  redirects: async () => [
    {
      source: "/",
      destination: "/dmu",
      permanent: false,
    },
    {
      source: "/:setCode/:deck(all|wu|ub|br|rg|wg|wb|ur|bg|wr|ug)",
      destination: "/:setCode?deck=:deck",
      permanent: false,
    },
  ],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.tsx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            // #444 is the color Keyrune and Mana use for path fill in SVGs
            replaceAttrValues: { "#444": "currentColor" },
            svgoConfig: {
              plugins: [
                {
                  name: "removeViewBox",
                  active: false,
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};
