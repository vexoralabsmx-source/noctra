import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        noctra: {
          bg: "#040306",
          text: "#F5F1E8",
          muted: "#8F95A3",
          pink: "#FF4D8D",
          red: "#E11D48",
          blue: "#38BDF8",
          violet: "#8B5CF6"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"],
        mono: ["JetBrains Mono", "SFMono-Regular", "Consolas", "monospace"]
      },
      boxShadow: {
        glow: "0 0 80px rgba(255,77,141,0.22)",
        blueglow: "0 0 80px rgba(56,189,248,0.18)"
      }
    }
  },
  plugins: []
};

export default config;
