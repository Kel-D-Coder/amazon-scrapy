/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", 'sans-serif' ]
      },
      colors: {
        themePrimary: '#FFFF00',
        themeSecondray: '#efefef'
      }
    },
  },
  plugins: [],
}

