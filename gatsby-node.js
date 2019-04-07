const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const _ = require('lodash');
const blogPostTemplate = path.resolve('src/templates/blog-template.jsx');
const tagTemplate = path.resolve('src/templates/tag-template.jsx');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
              tags
              keywords
              summary
            }
          }
          next {
            frontmatter {
              path
              title
            }
          }
          previous {
            frontmatter {
              path
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach(({ node, next, previous }) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {
          next: previous, // we need to invert these 2 because we query date descending
          previous: next
        }
      });
    });

    let tags = [];

    _.each(posts, edge => {
      if (_.get(edge, 'node.frontmatter.tags')) {
        tags = tags.concat(edge.node.frontmatter.tags);
      }
    });

    tags.forEach(tag => {
      createPage({
        path: `tags/${_.kebabCase(tag)}`,
        component: tagTemplate,
        context: {
          tag
        }
      });
    });
  });
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path === '/') {
    page.context.isRoot = true;
    createPage(page);
  }
};

// this method is added for `gatsby-plugin-feed`, but not really sure how it works :|
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};
