const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      neutral: colors.neutral,
      amber: { 600: colors.amber["600"] },
      blue: { 500: colors.blue["500"] },
      common: "#1a1718",
      uncommon: "#707883",
      rare: "#a58e4a",
      mythic: "#bf4427",
      "A+": "#23C552",
      A: "#41C755",
      "A-": "#60CA58",
      "B+": "#7ECC5B",
      B: "#9CCF5F",
      "B-": "#BAD162",
      "C+": "#D9D465",
      C: "#F7D668",
      "C-": "#EEAF5D",
      "D+": "#E68751",
      D: "#DD6046",
      "D-": "#D5383A",
      F: "#CC112F",
    },
    extend: {
      blur: {
        xs: "2px",
      },
      fontFamily: {
        belerenSmallCaps: "Beleren SmallCaps Bold",
      },
      spacing: {
        15: "3.75rem",
      },
      transitionProperty: {
        "max-h": "max-height",
      },
    },
  },
  plugins: [],
};
