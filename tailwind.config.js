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
        'lightgray': '#e3e3e3',
        'bubble-gum': '#ff77e9',
        'bermuda': '#0ee3bd',
        'darkbermuda': '#0cc4a3',
        'scarlet': '#fc3535',
        'darkscarlet': '#cc2727'
      },
      fontFamily: {
        'poppins':['poppins','serif']
      },
    }
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
  variants: {
    scrollbar: ['rounded']
  }
}