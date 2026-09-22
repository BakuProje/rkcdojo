import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        kyokushin: {
          red: "#E50914",
          redDark: "#B8060F",
          redLight: "#FF2E3B",
          redGlow: "rgba(229, 9, 20, 0.35)",
          black: "#0A0A0C",
          dark: "#121216",
          cardDark: "#18181E",
          cardLight: "#FFFFFF",
          slate: "#1E2028",
          grayText: "#64748B",
          borderLight: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
      },
      boxShadow: {
        "soft-sm": "0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.03)",
        "soft-md": "0 8px 24px -4px rgba(0, 0, 0, 0.06), 0 4px 12px -2px rgba(0, 0, 0, 0.03)",
        "soft-lg": "0 16px 36px -6px rgba(0, 0, 0, 0.08), 0 6px 16px -3px rgba(0, 0, 0, 0.04)",
        "soft-xl": "0 24px 50px -10px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.05)",
        "soft-inner": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)",
        "red-glow": "0 8px 24px -4px rgba(229, 9, 20, 0.45), 0 4px 10px -2px rgba(229, 9, 20, 0.3)",
        "red-glow-lg": "0 12px 36px -4px rgba(229, 9, 20, 0.6), 0 6px 16px -2px rgba(229, 9, 20, 0.4)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
