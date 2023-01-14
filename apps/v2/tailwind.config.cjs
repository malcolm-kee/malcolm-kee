const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: colors.teal,
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
