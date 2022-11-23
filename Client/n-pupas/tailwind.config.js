module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-100': '#F8F1F9',
        'primary-500': '#4A3957',
        'primary-400': '#BB96B7',
        'primary-300': '#CAAAC7',
        'secondary-500': '#C6D7F4',
        'gray-250': '#DBDBDB',
        'yellow-550': '#DEB929',
        'red-500': '#CE0E0E',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      screens: {
        xs: '281px',
      },
    },
  },
  plugins: [],
};
