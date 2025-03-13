/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        NunitoSans: ["Nunito Sans", "sans-serif"],
      },
      colors: {
        darkerblue: "hsl(209, 23%, 22%",
        verydarkblue: "hsl(207, 26%, 17%)",
        verydarkbluetext: "hsl(200, 15%, 8%)",
        darkgrey: "hsl(0, 0%, 52%)",
        lightgrey: "hsl(0, 0%, 98%)",
        white: "hsl(0, 0%, 100%)",
      },
    },
  },
  plugins: [],
};
