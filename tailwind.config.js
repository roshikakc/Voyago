/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",              // include your main HTML
    "./src/**/*.{js,jsx,ts,tsx}" // include all your React/JSX files
  ],
  theme: {
    extend: {
      colors:{
        primary:'#0c4760',
        secondary:'#738fa7',
        ternary:'#ccd8e4',
      },
    },                  // you can extend colors, spacing, etc. later
  },
  plugins: [],
}
