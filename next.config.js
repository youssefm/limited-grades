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
        source: "/:set",
        destination: "/:set/all",
        permanent: true,
      },
    ];
  },
};
