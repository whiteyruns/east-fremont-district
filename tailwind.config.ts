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
        // Background colors
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-tertiary": "var(--bg-tertiary)",
        "bg-hero": "var(--bg-hero)",
        // Text colors
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-tertiary": "var(--text-tertiary)",
        // Accent colors
        "accent-primary": "var(--accent-primary)",
        "accent-hover": "var(--accent-hover)",
        // Border colors
        "border-default": "var(--border-default)",
        "border-hover": "var(--border-hover)",
        // Legacy
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: "var(--font-geist-sans), system-ui, -apple-system",
        mono: "var(--font-geist-mono), monospace",
      },
      fontSize: {
        hero: ["clamp(2.5rem, 6vw, 4rem)", { lineHeight: "1.1" }],
        "page-title": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.2" }],
        section: ["clamp(1.5rem, 2vw, 2rem)", { lineHeight: "1.3" }],
        caption: ["clamp(0.75rem, 1vw, 0.875rem)", { lineHeight: "1.4" }],
        metric: ["clamp(2rem, 5vw, 3.5rem)", { lineHeight: "1" }],
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};
export default config;
