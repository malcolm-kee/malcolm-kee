const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './astro.config.ts'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.teal,
      },
      width: {
        'square-diagonal': `${(Math.sqrt(2) * 100).toFixed(2)}%`,
      },
      fontFamily: {
        handwrite: ['"EduNSWACTFoundation"', '"Brush Script MT"', 'cursive'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            pre: {
              padding: 0,
              borderRadius: 0,
            },
            'h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]': {
              position: 'relative',
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
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/line-clamp'),
    require('@headlessui/tailwindcss'),
    plugin(function ({ addVariant, matchVariant }) {
      addVariant('online', ':root[data-online="true"] &');
      addVariant('offline', ':root[data-online="false"] &');
      addVariant('installable', ':root[data-installable="true"] &');
      matchVariant('mode', (value) => `@media (display-mode: ${value})`, {
        values: {
          fullscreen: 'fullscreen',
          standalone: 'standalone',
          minimal: 'minimal',
          browser: 'browser',
        },
      });
    }),
  ],
};
