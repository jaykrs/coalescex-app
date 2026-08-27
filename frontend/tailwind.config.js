/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#12131A",          // near-black text, warmer than pure slate
        paper: "#F6F5F1",        // quiet warm-gray page background (not cream #F4F1EA)
        surface: "#FFFFFF",
        line: "#E4E2DB",
        muted: "#6B6A63",
        brand: {
          DEFAULT: "#1E4A3D",    // deep pine — signals "learning/growth", not SaaS-violet
          50: "#EAF1EE",
          100: "#CFE0D7",
          400: "#3C7A63",
          600: "#1E4A3D",
          700: "#153630",
        },
        accent: "#C6672B",       // burnt amber — used sparingly for progress/CTAs
        danger: "#B3412C",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        sm: "3px",
        DEFAULT: "6px",
        lg: "10px",
      },
    },
  },
  plugins: [],
};
