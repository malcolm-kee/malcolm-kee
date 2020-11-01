module.exports = {
  plugins: [
    'postcss-import',
    'tailwindcss',
    'postcss-focus-visible',
    'postcss-simple-vars',
    'postcss-nested',
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    ],
    'postcss-browser-reporter',
    'postcss-reporter',
  ],
};
