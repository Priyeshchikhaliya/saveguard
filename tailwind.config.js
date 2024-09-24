/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media' based on your preference
  theme: {
    extend: {
      colors: {

      },
      fontFamily: {
        "manrope-medium": ["Manrope Medium", "sans-serif"],
        "manrope-regular": ["Manrope Regular", "sans-serif"],
        "manrope-regular": ["Manrope Bold", "sans-serif"],
      },
      keyframes: {
        popUp: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '60%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'pop-up': 'popUp 0.6s ease-out',
      },
    },
  },
  plugins: [],
}