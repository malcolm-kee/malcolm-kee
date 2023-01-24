require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
const packageJson = require('./package.json');

const siteMetadata = {
  title: 'Malcolm Kee',
  description: packageJson.description,
  siteUrl: packageJson.homepage,
  author: packageJson.author,
  keywords: packageJson.keywords,
  repositoryUrl: packageJson.repository.url,
  social: {
    twitter: '@Malcolm_Kee',
  },
};

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata,
  pathPrefix: '/archive',
  plugins: [
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [
          require('tailwindcss'),
          require('postcss-preset-env'),
          require('postcss-browser-reporter'),
          require('postcss-reporter'),
          require('postcss-flexbugs-fixes'),
        ],
      },
    },
    'gatsby-plugin-js-fallback',
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: [`@philpl/buble`, `buble`],
        test: /\.jsx?$/,
      },
    },
    'gatsby-plugin-layout',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-youtube-v2',
      options: {
        channelId: [process.env.YOUTUBE_CHANNEL_ID],
        apiKey: process.env.YOUTUBE_API_ID,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/assets`,
        name: 'images',
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-remove-serviceworker`,
  ],
};
