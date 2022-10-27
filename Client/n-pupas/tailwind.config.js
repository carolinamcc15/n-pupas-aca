module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-100': '#E4EEFD',
        'primary-500': '#2F80ED',
        'primary-700': '#1B68CD',
        'secondary-500': '#0099FF',
        'gray-250': '#DBDBDB',
        'yellow-550': '#DEB929',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      },
      screens: {
        xs: '281px',
      },
    },
  },
  plugins: [],
};
