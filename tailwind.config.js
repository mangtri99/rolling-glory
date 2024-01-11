/** @type {import('tailwindcss').Config} */
const { iconsPlugin, getIconCollections } = require("@egoist/tailwindcss-icons")
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  
  theme: {
    container: {
      center: true,
    },
    extend: {
      backgroundImage: {
        'batik': "url('/src/assets/bg-batik.svg')",
      },
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#74B71B",
          '500': '#006A4E'
        },
        secondary: {
          DEFAULT: "#838EAB",
          '50': '#E1E8EE',
          '100': "#f2f2f4",
          '200': '#D8D8D8',
          '300': "#888888",
        },
        gold: {
          DEFAULT: "#F0D946",
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    iconsPlugin({
      // Select the icon collections you want to use
      // You can also ignore this option to automatically discover all icon collections you have installed
      collections: getIconCollections(["mdi", "lucide"]),
    }),
  ],
}

