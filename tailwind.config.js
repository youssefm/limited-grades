module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        common: "#1a1718",
        uncommon: "#707883",
        rare: "#a58e4a",
        mythic: "#bf4427",
      },
      fontFamily: {
        belerenSmallCaps: "Beleren SmallCaps Bold",
      },
    },
  },
  plugins: [],
};
