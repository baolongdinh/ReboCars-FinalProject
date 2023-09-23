/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class',
  theme: {
    extend: {
      spacing: {
        400: "400px",
        750: "750px",
        75: "75px",
        80: "80px",
        90: "90px",
        110: "110px",
        735: "735px",
        727: "727px",
        665: "665px",
        620: "620px",
        52: "52px",
        33: "33px",
        ne100: "-100px",
        ne120: "-120px",
        ne70: "-70px",
        ne150: "-150px",
        410: "410px",
        250: "250px",
        305: "305px",
        415: "415px",
      },
    },
    fontSize: {
      xxm: "0.5rem",
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
  },
  plugins: [require("flowbite/plugin")],
  content: ["./node_modules/flowbite/**/*.js"],
};
