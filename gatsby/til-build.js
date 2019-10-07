const path = require('path');
const _ = require('lodash');
const { isArray } = require('typesafe-is');
const { mdxResolverPassthrough } = require('./shared');

/**
 * Create `Til` node when mdx node is created.
 */
exports.createTilNode = async ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode, createParentChildLink } = actions;

  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;

  if (source === 'til') {
    let slug;
    const frontMatterPath = node.frontmatter && node.frontmatter.path;
    if (frontMatterPath) {
      slug = frontMatterPath;
    } else {
      const { name } = path.parse(fileNode.relativePath);

      slug = `/today-i-learnt/${name}`;
    }

    const fieldsData = {
      title: node.frontmatter.title,
      slug,
      topics: node.frontmatter.topics || [],
      date: node.frontmatter.date,
    };

    const postId = createNodeId(`${node.id} >>> Til`);

    await createNode({
      ...fieldsData,
      id: postId,
      parent: node.id,
      children: [],
      internal: {
        type: `Til`,
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

const tilTemplate = path.resolve(
  __dirname,
  '..',
  'src',
  'templates',
  'til-template.jsx'
);

exports.createTilSchemaCustomization = function createTilSchemaCustomization({
  actions,
  schema,
}) {
  const { createTypes } = actions;

  const typeDefs = [
    schema.buildObjectType({
      name: 'Til',
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
        html: {
          type: `String!`,
          resolve: mdxResolverPassthrough('html'),
        },
      },
    }),
  ];

  createTypes(typeDefs);
};

exports.createTils = function createTils({ actions, graphql }) {
  const { createPage } = actions;

  return graphql(`
    {
      allTil(sort: { fields: date, order: DESC }, limit: 1000) {
        nodes {
          id
          slug
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allTil.nodes.forEach(til => {
      createPage({
        path: til.slug,
        component: tilTemplate,
        context: {
          id: til.id,
        },
      });
    });
  });
};
