const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.teal,
      },
      width: {
        'square-diagonal': `${(Math.sqrt(2) * 100).toFixed(2)}%`,
      },
      typography: {
        DEFAULT: {
          css: {
            pre: {
              padding: 0,
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
