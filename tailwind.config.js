/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "off-black": "#282B30",
        "off-white": "#EEE7D3",
        "dark-blue": "#474EA5",
        tan: "#A7917A",
        yellow: "#F5A00F",
        "theme-red": "#E85539",
      },
      boxShadow: {
        block: "8px 8px 0px #282B30",
        "yellow-block": "8px 8px 0px #f5a00f",
      },
    },
  },
  plugins: [],
}
