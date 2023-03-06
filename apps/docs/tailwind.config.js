const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config } */
const config = {
  content: ["src/**/*.{ts,js,tsx,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: colors.blue,
        primaryb: {
          50: "#edfff8",
          100: "#d5fff1",
          200: "#aeffe3",
          300: "#70ffcf",
          400: "#2bfdb4",
          500: "#00ffa7",
          600: "#00c079",
          700: "#009662",
          800: "#067550",
          900: "#076044",
        },
      },
    },
  },
};

module.exports = config;
