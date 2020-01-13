const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    minWidth: {
      '0': '0',
      sm: '4rem',
      md: '8rem',
      lg: '16rem',
      full: '100%',
    },
    screens: {
      xs: '450px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        primary: colors.teal,
      },
    },
  },
  plugins: [
    require('tailwindcss-transition')({
      standard: 'all .3s ease',
      transitions: {
        slow: 'all 2s ease',
        'normal-in-out-quad': 'all 2s cubic-bezier(0.455, 0.03, 0.515, 0.955)',
        'slow-in-out-quad': 'all 2s cubic-bezier(0.455, 0.03, 0.515, 0.955)',
      },
    }),
  ],
};
