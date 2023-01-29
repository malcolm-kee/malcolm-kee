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
      typography: (theme) => ({
        DEFAULT: {
          css: {
            pre: {
              padding: 0,
            },
            '.footnotes': {
              paddingTop: theme('spacing.4'),
              borderTop: `1px solid ${theme('colors.gray.200')}`,
            },
            '.footnotes > ol > li': {
              marginTop: theme('spacing.1'),
              marginBottom: theme('spacing.1'),
              fontSize: '0.875rem',
              lineHeight: '1.25rem',
            },
            '.footnotes > ol > li > p': {
              marginTop: theme('spacing.1'),
              marginBottom: theme('spacing.1'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
