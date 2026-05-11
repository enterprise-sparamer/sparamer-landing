import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "var(--color-cream)",
        ink: {
          DEFAULT: "var(--color-ink)",
          75: "var(--color-ink-75)",
          70: "var(--color-ink-70)",
          55: "var(--color-ink-55)",
          40: "var(--color-ink-40)",
          15: "var(--color-ink-15)",
        },
        olive: {
          DEFAULT: "var(--color-olive)",
          deep: "var(--color-olive-deep)",
        },
        mostarda: {
          DEFAULT: "var(--color-mostarda)",
          strong: "var(--color-mostarda-strong)",
          stamp: "var(--color-mostarda-stamp)",
        },
        ceramica: "var(--color-ceramica)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display, var(--font-sans))", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        hero: ["clamp(3.5rem, 8vw, 8rem)", { lineHeight: "0.95", letterSpacing: "-0.025em", fontWeight: "500" }],
        display: ["clamp(1.875rem, 4vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "500" }],
      },
      animation: {
        "flow": "flow 3s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
      keyframes: {
        flow: {
          "0%, 100%": { strokeDashoffset: "0" },
          "50%": { strokeDashoffset: "20" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
