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
        source: "/:set",
        destination: "/:set/all",
        permanent: true,
      },
    ];
  },
};
