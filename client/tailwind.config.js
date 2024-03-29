/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src{/**/*,/*}.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 10s linear infinite"
      },
      dropShadow: {
        glow: [
          "0 0px 20px rgba(255,255, 255, 0.35)",
          "0 0px 65px rgba(255, 255,255, 0.2)"
        ]
      }
    }
  },
  plugins: []
};
