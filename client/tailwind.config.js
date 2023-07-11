/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      backgroundImage: {
        'customGradient': "linear-gradient(-45deg,  #1d2d34,#05b78e, #3d3d43)",

      },
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
        },
        gradient: {
          '0%,100%': { backgroundPosition: '0%,50%' },
          '50%': { backgroundPosition: '100%,50%' },

        }
      },
      animation: {
        slideThrough: 'slideThrough 5s ease-in-out',

        spinOnce: 'rotateAnimation .5s ease-in-out',
        gradientFlow: 'gradient 15s ease infinite'
      }
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#05b78e",

          "secondary": "#47067c",

          "accent": "#9b02e2",

          "neutral": "#1d2d34",

          "base-100": "#3d3d43",

          "info": "#66c8db",

          "success": "#5ddabd",

          "warning": "#934c06",

          "error": "#ec5b51",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

