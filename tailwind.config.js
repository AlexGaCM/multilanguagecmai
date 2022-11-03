/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    screens: {
      'laptop': '640px',
      'desktop': '1560px',
    },
    extend: {},
  },
  plugins: [],
}
