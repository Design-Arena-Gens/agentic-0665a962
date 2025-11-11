/**** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fff9e6',
          100: '#fff1c2',
          200: '#ffe28a',
          300: '#ffd052',
          400: '#ffc127',
          500: '#f4b400',
          600: '#c78f00',
          700: '#9b6f00',
          800: '#6f4f00',
          900: '#463300'
        }
      }
    },
  },
  plugins: [],
};
