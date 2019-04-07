const path = require('path');
const packageJson = require('./package.json');

module.exports = {
  siteMetadata: {
    title: 'Malcolm Kee',
    description: packageJson.description,
    siteUrl: packageJson.homepage,
    author: packageJson.author,
    keywords: packageJson.keywords,
    social: {
      twitter: '@Malcolm_Kee'
    }
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-postcss',
    'gatsby-plugin-layout',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.join(__dirname, 'blogs'),
        name: 'markdown-pages'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets`,
        name: 'images'
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-external-links',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590
            }
          },
          'gatsby-remark-prismjs'
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Malcolm Kee',
        short_name: 'Malcolm Kee',
        start_url: '/',
        display: 'standalone',
        background_color: 'white',
        theme_color: '#e44d26',
        icon: 'src/assets/new-icon.png'
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-53298674-1',
        anonymize: true
      }
    },
    'gatsby-plugin-feed',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-netlify',
    'gatsby-plugin-remove-serviceworker'
  ]
};
