require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
const path = require('path');
const packageJson = require('./package.json');

module.exports = {
  siteMetadata: {
    title: 'Malcolm Kee',
    description: packageJson.description,
    siteUrl: packageJson.homepage,
    author: packageJson.author,
    keywords: packageJson.keywords,
    repositoryUrl: packageJson.repository.url,
    social: {
      twitter: '@Malcolm_Kee',
    },
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-compile-es6-packages`, // test?
      options: {
        modules: [`@philpl/buble`, `buble`],
      },
    },
    `gatsby-plugin-layout`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: 'GitHub',
        fieldName: 'github',
        url: 'https://api.github.com/graphql',
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
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
        name: 'markdown-pages',
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
      resolve: `gatsby-mdx`,
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
      },
    },
    `gatsby-plugin-remove-trailing-slashes`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Malcolm Kee',
        short_name: 'Malcolm Kee',
        start_url: '/',
        display: 'standalone',
        background_color: 'white',
        theme_color: '#e65733',
        icon: 'src/assets/new-icon.png',
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
                allMdx(
                  filter: { fields: { workshopcontent: { eq: false } }, frontmatter: { published: { eq: true } } }
                  sort: { order: DESC, fields: [frontmatter___date] }
                ) {
                  edges {
                    node {
                      html
                      frontmatter {
                        title
                        date(formatString: "MMM DD, YYYY")
                        path
                        summary
                      }
                    }
                  }
                }
              }
            `,
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.summary,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  guid: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
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
    `gatsby-plugin-advanced-sitemap`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-remove-serviceworker`,
  ],
};
