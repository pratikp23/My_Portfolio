/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#08080a",
        panel: "#111115",
        surface: "#111115",
        silver: "#e2e8f0",
        platinum: "#f8fafc",
        lime: "#c8f542",
        viol: "#8b7cff",
        amber: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#e2e8f0', // Liquid Platinum highlight
          500: '#f8fafc', // Pure Luminous Titanium White
          600: '#cbd5e1', // Brushed Slate Silver
          700: '#94a3b8',
          800: '#64748b',
          900: '#475569',
          950: '#0f172a',
        },
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', '"Bricolage Grotesque"', "sans-serif"],
        serifit: ['"Instrument Serif"', "serif"],
      },
    },
  },
  plugins: [],
};
