/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,ejs}"],
  theme: {
    extend: {
      colors: {
        'primary': '#3F4028',
        'secondary': '#D4D4B4',
        'secondary-1': '#BC9BFB',
        'secondary-2': '#F7E965',
        'secondary-3': '#4EA46D'
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'rubil': ['Rubik', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}
