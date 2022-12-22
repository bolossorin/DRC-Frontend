/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: '#F6F6F6',
        text: '#D9D9D9',
        stroke: '#686868',
        fill: '#3c3c3c',
      }
    },
  },
  plugins: [],
}
