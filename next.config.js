/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/vow",
        permanent: false,
      },
      {
        source: "/:set/:deck",
        destination: "/:set",
        permanent: false,
      },
    ];
  },
  staticPageGenerationTimeout: 600,
};
