/** @type {import('next').NextConfig} */
module.exports = {
  output: "standalone",
  reactStrictMode: true,
  redirects: async () => [
    {
      source: "/",
      destination: "/fdn",
      permanent: false,
    },
    {
      source: "/:setCode/:deck(all|wu|ub|br|rg|wg|wb|ur|bg|wr|ug)",
      destination: "/:setCode?deck=:deck",
      permanent: false,
    },
  ],
  staticPageGenerationTimeout: 1_200,
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
                // Prevent SVGO from stripping the viewBox from SVGs
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
