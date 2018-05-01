module.exports = {
  siteMetadata: {
    title: 'Malcolm Kee',
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/markdown`,
        name: 'markdown-pages',
      },
    },
    'gatsby-transformer-remark',
  ],
};
