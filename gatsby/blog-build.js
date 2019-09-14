const path = require('path');
const _ = require('lodash');
const { isArray } = require('typesafe-is');

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

exports.createBlogSchemaCustomization = function createBlogSchemaCustomization({
  actions,
  schema,
}) {
  const { createTypes } = actions;

  const typeDefs = [
    schema.buildObjectType({
      name: 'Mdx',
      interfaces: ['Node'],
      fields: {
        blogUrl: {
          type: 'String',
          resolve: (source, args, context, info) => {
            const fileNode = context.nodeModel.getNodeById({
              id: source.parent,
              type: 'File',
            });

            if (!fileNode || fileNode.sourceInstanceName !== 'blogs') {
              return null;
            }

            const frontMatterPath =
              source.frontmatter && source.frontmatter.path;

            if (frontMatterPath) {
              return frontMatterPath;
            }

            const { name } = path.parse(fileNode.relativePath);

            return `/blog/${name}`;
          },
        },
      },
    }),
  ];

  createTypes(typeDefs);
};

exports.createBlogs = function createBlogs({ actions, graphql }) {
  if (process.env.DISABLE_BLOG) {
    // optimize local build time
    return;
  }

  const { createPage } = actions;

  return graphql(`
    {
      allMdx(
        filter: { blogUrl: { ne: null } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              tags
              keywords
              summary
            }
            blogUrl
          }
          next {
            frontmatter {
              title
            }
            blogUrl
          }
          previous {
            frontmatter {
              title
            }
            blogUrl
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const posts = process.env.NUM_OF_BLOGS
      ? result.data.allMdx.edges.slice(0, Number(process.env.NUM_OF_BLOGS))
      : result.data.allMdx.edges;

    posts.forEach(({ node, next, previous }) => {
      createPage({
        path: node.blogUrl,
        component: blogPostTemplate,
        context: {
          id: node.id,
          next: previous, // we need to invert these 2 because we query date descending
          previous: next,
          commentsSearch: `repo:malcolm-kee/malcolm-kee label:comment ${node.blogUrl} in:title sort:created-asc`,
          relatedBlogs: isArray(node.frontmatter && node.frontmatter.tags)
            ? _.sampleSize(
                posts.filter(
                  post =>
                    post.node !== node &&
                    isArray(
                      post.node.frontmatter && post.node.frontmatter.tags
                    ) &&
                    post.node.frontmatter.tags.some(tag =>
                      node.frontmatter.tags.includes(tag)
                    )
                ),
                3
              )
            : [],
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
