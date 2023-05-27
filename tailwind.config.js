/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'black': '#000000',
        'purple': '#3f3cbb',
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#808080',
        'lightsilver': '#a6a6a6',
        'lightgray': '#e3e3e3',
        'bubble-gum': '#ff77e9',
        'bermuda': '#0DD9B5',
        'darkbermuda': '#0BB99A',
        'scarlet': '#fc3535',
        'darkscarlet': '#db2e2e',
        'malibu': '#62cdfd',
        'darkmalibu': '#4c9dc2'
      },
      fontFamily: {
        'sans': ['poppins','serif']
      },
    }
  },
  plugins: []
}