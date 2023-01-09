require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
const path = require('path');
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
    'gatsby-transformer-yaml',
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
        path: path.join(__dirname, 'workshops'),
        name: 'workshops',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, 'blogs'),
        name: 'blogs',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, 'notes'),
        name: 'notes',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, 'til'),
        name: 'til',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, 'src', 'data'),
        name: 'data',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.join(__dirname, 'education'),
        name: 'education',
      },
    },
    {
      resolve: `gatsby-source-npmsio`,
      options: {
        name: 'malcolm',
        qualifier: {
          author: `malcolmkee`,
        },
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
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-external-links`,
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `header-link-icon`,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              withWebp: true,
            },
          },
        ],
        plugins: [`gatsby-remark-images`],
      },
    },
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Malcolm Kee',
        short_name: 'Malcolm Kee',
        start_url: '/',
        display: 'standalone',
        background_color: 'white',
        theme_color: '#2c7a7b',
        icon: 'src/assets/mk-icon.png',
        include_favicon: false,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-53298674-1',
        anonymize: true,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            query: `
              {
                allBlogPost(
                  filter: { published: { eq: true } }
                  sort: { order: DESC, fields: [date] }
                ) {
                  edges {
                    node {
                      slug
                      html
                      title
                      date(formatString: "MMM DD, YYYY")
                      summary
                    }
                  }
                }
              }
            `,
            serialize: ({ query: { site, allBlogPost } }) => {
              return allBlogPost.edges.map((edge) => {
                return Object.assign({}, edge.node, {
                  description: edge.node.summary,
                  url: site.siteMetadata.siteUrl + edge.node.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                });
              });
            },
            output: '/rss.xml',
            title: `Malcolm Kee's blog`,
          },
        ],
      },
    },
    `gatsby-plugin-netlify`,
    `gatsby-plugin-remove-serviceworker`,
  ],
};
