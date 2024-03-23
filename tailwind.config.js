const { transform } = require('typescript')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        skeleton: "skeleton 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        hilang: "hilang 0.4s forwards",
      },
      keyframes: {
        hilang: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0, display: "none" },
        },
        skeleton: {
          "0%, 100%": { opacity: 1 },
          "50%": {
            opacity: 0.5,
          },
        },
        slideUp: {
          from: {
            transform: "translateY(100%)"
          },
          to: {
            transform: "translateY(0%)"
          }
        },
        slideLeft: {
          from : {
            transform: "translateX(100%)"
          },
          to: {
            transform: "translateX(0%)"
          }
        },
        slideInFromRight: {
          from: {
            transform: "translateX(100%) translateY(-100%)"
          },
          to: {
            transform: "translateX(0%) translateY(0%)"
          }
        }

      },
      animation: {
        slideUp: "slideUp 1.4s ease",
        slideLeft: "slideLeft 1.4s ease",
        slideInFromRight: "slideInFromRight 1.4s ease"
      },
      colors: {
        primary: "#1B4E6B",
        secondary: "#FFDE59",
        button: "#5EACDD",
        border: "rgba(255, 255, 255, 0.16)",
        tersier: "#90A3BF",
      },
      borderRadius: {
        small: "5px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
  plugins: [
    require("@tailwindcss/typography"),
  ]
};
