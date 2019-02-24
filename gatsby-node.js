/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');
const _ = require('lodash');
const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`);
const tagTemplate = path.resolve(`src/templates/tagTemplate.js`);

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
          previous: next,
        },
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
          tag,
        },
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
