/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideThrough: {
          '0%': { transform: 'translateX(-1000%)' },
          '25%': { transform: 'translateX(0)' },
          '75%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(-1000%)', opacity: 0 },
        }
      },
      animation: {
        slideThrough: 'slideThrough 5s ease-in-out ',
      }
    },
  },
  plugins: [require("daisyui")],
}

