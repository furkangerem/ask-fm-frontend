/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-reddish-brown": "#330000",
        "taupe-color": "#73605B",
        "navbar-item-color": "#F66245",
        "light-peachy-brown": "#D09683",
        "first-blue": "#355C7D",
        "second-blue": "#3B8ACD",
        "third-blue": "#4BB4DE",
        "cream-color": "#EFDBCB",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
