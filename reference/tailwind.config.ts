// tailwind.config.ts

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
        district: {
          bg: {
            primary: "#0F1115",
            secondary: "#1A1D23",
            tertiary: "#24272E",
            hero: "#0A0C0F",
          },
          text: {
            primary: "#F0EDE8",
            secondary: "#9B978F",
            tertiary: "#6B6760",
            disabled: "#4A4740",
          },
          accent: {
            primary: "#C49A6C",
            hover: "#D4AA7C",
            muted: "#8B7355",
          },
          border: {
            default: "#2A2D33",
            hover: "#3A3D43",
            accent: "#C49A6C",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      maxWidth: {
        container: "1280px",
      },
      fontSize: {
        hero: [
          "clamp(2.5rem, 5vw, 4.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "page-title": [
          "clamp(2rem, 4vw, 3.5rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        section: [
          "clamp(1.5rem, 3vw, 2.25rem)",
          { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        caption: [
          "0.75rem",
          {
            lineHeight: "1.5",
            letterSpacing: "0.08em",
            fontWeight: "500",
          },
        ],
        metric: [
          "clamp(2rem, 4vw, 4rem)",
          { lineHeight: "1", fontWeight: "700" },
        ],
      },
      spacing: {
        section: "6rem",
        "section-mobile": "3rem",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
    },
  },
  plugins: [],
};

export default config;
