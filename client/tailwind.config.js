const tailwindcss = require("@tailwindcss/postcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindcss({
      optimize: false,
    }),
  ],
};
