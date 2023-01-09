/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: [
          "Inter",
          "-apple-system",
          "Segoe UI",
          "system-ui",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "Liberation Sans",
          "sans-serif",
        ],
        sans: [
          "-apple-system",
          "Segoe UI",
          "system-ui",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "Liberation Sans",
          "sans-serif",
        ],
      },
      colors: {
        primary: {
          1: "#FBF6EF",
          2: "#F2E4CF",
          3: "#EBD1AD",
          4: "#E2BF8D",
        },
      },
    },
    screens: {
      sm: "600px",
      md: "840px",
      lg: "960px",
      xl: "1240px",
      "2xl": "1440px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
