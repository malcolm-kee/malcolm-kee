const packageJson = require('./package.json');

module.exports = {
  siteMetadata: {
    title: 'Malcolm Kee',
    description: packageJson.description,
    siteUrl: packageJson.homepage,
    author: packageJson.author,
    keywords: packageJson.keywords,
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/markdown`,
        name: 'markdown-pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets`,
        name: 'images',
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
            },
          },
          'gatsby-remark-prismjs',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Malcolm Kee',
        short_name: 'Malcolm Kee',
        start_url: '/',
        display: 'standalone',
        background_color: 'white',
        theme_color: '#37474f',
        icon: 'src/assets/icon.png',
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-netlify',
    'gatsby-plugin-offline',
  ],
};
