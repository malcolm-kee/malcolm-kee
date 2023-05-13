const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

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
        techie: ['"Chakra Petch"', '"Chakra Petch-fallback"', ...defaultTheme.fontFamily.sans],
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
    plugin(function ({ addVariant, matchVariant, addUtilities, matchUtilities, theme }) {
      addVariant('online', ':root[data-online="true"] &');
      addVariant('offline', ':root[data-online="false"] &');
      addVariant('installable', ':root[data-installable="true"] &');
      addVariant('saveable', ':root[data-cansave="true"] &');
      matchVariant('mode', (value) => `@media (display-mode: ${value})`, {
        values: {
          fullscreen: 'fullscreen',
          standalone: 'standalone',
          minimal: 'minimal',
          browser: 'browser',
        },
      });
      addUtilities({
        '.cut-tr': {
          '--_corner-x-size': 'var(--corner-x-size, calc(2 * var(--corner-size)))',
          '--_corner-y-size': 'var(--corner-y-size, var(--corner-size))',
          'clip-path': `polygon(0% 0%, calc(100% - var(--_corner-x-size)) 0%, 100% var(--_corner-y-size), 100% 100%, 0% 100%)`,
        },
        '.cut-all': {
          '--_corner-x-size': 'var(--corner-x-size, var(--corner-size))',
          '--_corner-y-size': 'var(--corner-y-size, var(--corner-size))',
          'clip-path': `polygon(
            var(--_corner-x-size) 0%,
            calc(100% - var(--_corner-x-size)) 0%,
            100% var(--_corner-y-size),
            100% calc(100% - var(--_corner-y-size)),
            calc(100% - var(--_corner-x-size)) 100%,
            var(--_corner-x-size) 100%,
            0% calc(100% - var(--_corner-y-size)),
            0% var(--_corner-y-size)
          )`,
        },
      });
      matchUtilities(
        {
          cut: (value) => ({
            '--corner-size': value,
          }),
          'cut-x': (value) => ({
            '--corner-x-size': value,
          }),
          'cut-y': (value) => ({
            '--corner-y-size': value,
          }),
        },
        {
          values: theme('spacing'),
        }
      );
    }),
  ],
};
