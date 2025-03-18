/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'custom-gradient': 'linear-gradient(36deg, #A100FFFF, #119CFDFF)',
        'welcome-bg': "url('https://img.freepik.com/premium-photo/hamburger-isolated-yellow-background-hamburger-falling-scattering-ai_985124-5605.jpg')",
      }
    },
  },
  plugins: [],
}

