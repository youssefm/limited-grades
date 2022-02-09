module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      blur: {
        xs: "2px",
      },
      colors: {
        common: "#1A1718",
        uncommon: "#707883",
        rare: "#A58E4A",
        mythic: "#BF4427",
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
      fontFamily: {
        belerenSmallCaps: "Beleren SmallCaps Bold",
      },
    },
  },
  plugins: [],
};
