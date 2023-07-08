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
        },
        rotateAnimation: {
          '0%': { transform: "rotateY(0deg)", filter: "blur(0px)" },
          '100%': { transform: "rotateY(-180deg)", filter: "blur(5px)" }
        }
      },
      animation: {
        slideThrough: 'slideThrough 5s ease-in-out ',

        spinOnce: 'rotateAnimation .5s ease-in-out ',

      }
    },
  },
  plugins: [require("daisyui")],
}

