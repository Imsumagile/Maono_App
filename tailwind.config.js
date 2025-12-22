/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#F57C00",
        secondary: "#1E293B",
        accent: "#FFB703",
        background: {
          DEFAULT: "#FFFFFF",
          muted: "#F8FAFC",
        },
        text: {
          primary: "#0F172A",
          secondary: "#64748B",
          disabled: "#CBD5E1",
        },
      },
    },
  },
  plugins: [],
};
