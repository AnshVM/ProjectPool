module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'black': "#333333",
        'graybg': "#f4f7fb",
        'white': "#FFFFFF"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
