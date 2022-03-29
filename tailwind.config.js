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
      "mc-start": "#cca54f",
      "mc-mid": "#e0d3bb",
      "A+": "#23c552",
      A: "#41c755",
      "A-": "#60ca58",
      "B+": "#7ecc5b",
      B: "#9ccf5f",
      "B-": "#bad162",
      "C+": "#d9d465",
      C: "#f7d668",
      "C-": "#eeaf5d",
      "D+": "#e68751",
      D: "#dd6046",
      "D-": "#d5383a",
      F: "#cc112f",
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
