/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class',
  theme: {
    extend: {
      spacing: {
        '400': '400px',
        '750': '750px',
        '80': '80px',
        '735': '735px',
        '52': '52px',
        '33' : '33px'
        
        
      }
    },
  },
  plugins: [require('flowbite/plugin')],
  content: [
    "./node_modules/flowbite/**/*.js"
]
}

