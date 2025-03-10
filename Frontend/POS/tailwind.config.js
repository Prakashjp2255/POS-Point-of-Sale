/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'custom-gradient': 'linear-gradient(36deg, #A100FFFF, #119CFDFF)',
      }
    },
  },
  plugins: [],
}

