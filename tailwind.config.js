/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0df2a0",    // Apple x Binance neon green
        dark: "#0b0b0c",
        card: "#131416"
      }
    }
  },
  plugins: []
};
