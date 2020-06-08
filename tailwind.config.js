const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.tsx',
    './src/**/*.ts',
    './blogs/**/*.md',
    './blogs/**/*.mdx',
    './til/**/*.md',
    './til/**/*.mdx',
    './workshops/**/*.md',
    './workshops/**/*.mdx',
  ],
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
    colors: {
      primary: colors.teal,
      black: colors.black,
      white: colors.white,
      red: colors.red,
      green: colors.green,
      blue: colors.blue,
      gray: colors.gray,
    },
  },
  variants: {
    backgroundColor: ['dark'],
    borderColor: ['dark'],
    textColor: ['dark'],
  },
  plugins: [require('tailwindcss-dark-mode')()],
  corePlugins: {
    placeholderColor: false,
    placeholderOpacity: false,
    scale: false,
    transitionProperty: false,
    rotate: false,
    translate: false,
    skew: false,
    transformOrigin: false,
  },
};
