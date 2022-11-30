/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    screens: {
      'laptop': '840px',
      'desktop': '1660px',
    },
    extend: {},
  },
  plugins: [],
}
