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
const blogListTemplate = path.resolve(
  __dirname,
  '..',
  'src',
  'templates',
  'blog-list-template.jsx'
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
        filter: { workshop: { id: { eq: null } } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            id
            frontmatter {
              tags
              keywords
              summary
            }
            fields {
              slug
            }
          }
          next {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
          previous {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const posts = process.env.ONLY_LAST_TWELVE_BLOGS
      ? result.data.allMdx.edges.slice(0, 12)
      : result.data.allMdx.edges;

    posts.forEach(({ node, next, previous }) => {
      createPage({
        path: node.fields.slug,
        component: blogPostTemplate,
        context: {
          id: node.id,
          next: previous, // we need to invert these 2 because we query date descending
          previous: next,
          commentsSearch: `repo:malcolm-kee/malcolm-kee label:comment ${node.fields.slug} in:title sort:created-asc`,
        },
      });
    });

    const postsPerPage = 10;
    const numPages = Math.ceil(posts.length / postsPerPage);

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blog` : `/blog/${i + 1}`,
        component: blogListTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
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
