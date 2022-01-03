module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "8xl": "1920px",
      },
      flex: {
        2: "2 2 0%",
      },
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [],
};
