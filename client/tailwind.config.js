/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Sans 3"', ...defaultTheme.fontFamily.sans]
      },
      keyframes: {
        rotateFullForwards: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        rotateFullBackwards: {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" }
        }
      },
      animation: {
        rotateFullForwards: "rotateFullForwards 1s ease-in-out",
        rotateFullBackwards: "rotateFullBackwards 1s ease-in-out"
      }
    }
  },
  plugins: []
};
