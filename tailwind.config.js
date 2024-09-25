/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'protest': ['Protest Guerrilla', 'sans-serif'], 
        'roboto': ['Roboto', 'sans-serif'], 
      },
        },
  },
  plugins: [],
}
