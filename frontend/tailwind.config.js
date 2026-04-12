/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: "#00ff41",
        dark: "#0a0a0a",
        card: "#111111",
      },
      fontFamily: {
        mono: ["Courier New", "SF Mono", "monospace"],
      },
      animation: {
        blink: "blink 1s step-end infinite",
        glow: "glow 1.5s ease-in-out infinite alternate",
        scan: "scan 8s linear infinite",
        flicker: "flicker 0.15s infinite",
        pulse: "pulse 2s infinite",
        fadeInUp: "fadeInUp 0.5s ease-out forwards",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        glow: {
          "0%": { textShadow: "0 0 2px #00ff41, 0 0 5px #00ff41" },
          "100%": { textShadow: "0 0 8px #00ff41, 0 0 12px #00ff41" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        flicker: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.3, textShadow: "0 0 5px #00ff41" },
        },
        fadeInUp: {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}