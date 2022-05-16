/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    outputStandalone: true,
  },
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  outputFileTracing: true,
  reactStrictMode: true,
  redirects: async () => [
    {
      source: "/en",
      destination: "/snc",
      locale: false,
      permanent: false,
    },
    {
      source: "/:locale(fr)",
      destination: "/:locale/snc",
      locale: false,
      permanent: false,
    },
    {
      source: "/en/:setCode/(all|wu|ub|br|rg|wg|wb|ur|bg|wr|ug)",
      destination: "/:setCode",
      locale: false,
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
