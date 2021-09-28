/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/mid",
        permanent: false,
      },
      {
        source: "/:expansion",
        destination: "/:expansion/all",
        permanent: true,
      },
    ];
  },
};
