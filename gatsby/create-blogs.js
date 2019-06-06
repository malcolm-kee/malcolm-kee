const path = require('path');
const _ = require('lodash');
const blogPostTemplate = path.resolve(
  __dirname,
  '..',
  'src',
  'templates',
  'blog-template.jsx'
);
const tagTemplate = path.resolve(
  __dirname,
  '..',
  'src',
  'templates',
  'tag-template.jsx'
);

module.exports = function createBlogs({ actions, graphql }) {
  if (process.env.DISABLE_BLOG) {
    // optimize local build time
    return;
  }

  const { createPage } = actions;

  return graphql(`
    {
      allMdx(
        filter: { fields: { workshopcontent: { eq: false } } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            id
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

    const posts = result.data.allMdx.edges;

    posts.forEach(({ node, next, previous }) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {
          id: node.id,
          next: previous, // we need to invert these 2 because we query date descending
          previous: next,
          commentsSearch: `repo:malcolm-kee/malcolm-kee label:comment ${
            node.frontmatter.path
          } in:title sort:created-asc`
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
