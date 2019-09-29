const path = require('path');
const _ = require('lodash');
const { isArray } = require('typesafe-is');

/**
 * Create `BlogPost` node when mdx node is created.
 */
exports.createBlogNode = async ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode, createParentChildLink } = actions;

  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;

  if (source === 'blogs') {
    let slug;
    const frontMatterPath = node.frontmatter && node.frontmatter.path;
    if (frontMatterPath) {
      slug = frontMatterPath;
    } else {
      const { name } = path.parse(fileNode.relativePath);

      slug = `/blog/${name}`;
    }

    const fieldsData = {
      title: node.frontmatter.title,
      slug,
      timeToRead: node.timeToRead,
      tags: node.frontmatter.tags || [],
      keywords: node.frontmatter.keywords || [],
      date: node.frontmatter.date,
      last_updated: node.frontmatter.last_updated || node.frontmatter.date,
      lang: node.frontmatter.lang || 'en',
      summary: node.frontmatter.summary,
      published: node.frontmatter.published || false,
      previewImage: {
        image: node.frontmatter.image,
        by: {
          name: node.frontmatter.imageBy,
          url: node.frontmatter.imageByLink,
        },
      },
    };

    const postId = createNodeId(`${node.id} >>> BlogPost`);

    await createNode({
      ...fieldsData,
      id: postId,
      parent: node.id,
      children: [],
      internal: {
        type: `BlogPost`,
        contentDigest: createContentDigest(fieldsData),
        content: JSON.stringify(fieldsData),
      },
    });

    createParentChildLink({
      parent: node,
      child: getNode(postId),
    });
  }
};

/**
 * Pass through fields from MDX to `BlogPost`
 */
const mdxResolverPassthrough = fieldName => async (
  source,
  args,
  context,
  info
) => {
  const type = info.schema.getType(`Mdx`);
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  });
  const resolver = type.getFields()[fieldName].resolve;
  const result = await resolver(mdxNode, args, context, {
    fieldName,
  });
  return result;
};

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
      name: 'BlogPost',
      interfaces: ['Node'],
      fields: {
        slug: {
          type: `String!`,
        },
        date: { type: `Date!`, extensions: { dateformat: {} } },
        body: {
          type: `String!`,
          resolve: mdxResolverPassthrough('body'),
        },
        published: {
          type: `Boolean!`,
        },
        timeToRead: {
          type: `Int`,
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
      allBlogPost(sort: { fields: date, order: DESC }, limit: 1000) {
        edges {
          node {
            id
            title
            tags
            summary
            keywords
            slug
          }
          next {
            title
            slug
          }
          previous {
            title
            slug
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const posts = process.env.NUM_OF_BLOGS
      ? result.data.allBlogPost.edges.slice(0, Number(process.env.NUM_OF_BLOGS))
      : result.data.allBlogPost.edges;

    posts.forEach(({ node, next, previous }) => {
      createPage({
        path: node.slug,
        component: blogPostTemplate,
        context: {
          id: node.id,
          next: previous, // we need to invert these 2 because we query date descending
          previous: next,
          commentsSearch: `repo:malcolm-kee/malcolm-kee label:comment ${node.slug} in:title sort:created-asc`,
          relatedBlogs: _.sampleSize(
            posts.filter(
              post =>
                post.node !== node &&
                (post.node.tags.some(tag => node.tags.includes(tag)) ||
                  post.node.keywords.some(keyword =>
                    node.keywords.includes(keyword)
                  ))
            ),
            3
          ),
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
      if (_.get(edge, 'node.tags')) {
        tags = tags.concat(edge.node.tags);
      }
    });

    tags = _.uniq(tags);

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
