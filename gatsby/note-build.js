const path = require('path');
const _ = require('lodash');
const { isArray } = require('typesafe-is');
const { mdxResolverPassthrough } = require('./shared');

/**
 * Create `Note` node when mdx node is created.
 * @type { import('gatsby').GatsbyNode['onCreateNode'] }
 */
exports.createNoteNode = async ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode, createParentChildLink } = actions;

  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;

  if (source === 'notes') {
    const { name } = path.parse(fileNode.relativePath);

    const slug = `/note/${name}/`;

    const fieldsData = {
      title: node.frontmatter.title,
      slug,
      lang: node.frontmatter.lang || 'en',
    };

    const postId = createNodeId(`${node.id} >>> Note`);

    await createNode({
      ...fieldsData,
      id: postId,
      parent: node.id,
      children: [],
      internal: {
        type: `Note`,
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
 * @type { import('gatsby').GatsbyNode['createSchemaCustomization'] }
 */
exports.createNoteSchemaCustomization = function createNoteSchemaCustomization({
  actions,
  schema,
}) {
  const { createTypes } = actions;

  const typeDefs = [
    schema.buildObjectType({
      name: 'Note',
      interfaces: ['Node'],
      fields: {
        slug: {
          type: `String!`,
        },
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

const noteTemplate = path.resolve(
  __dirname,
  '..',
  'src',
  'templates',
  'note-template.tsx'
);

/**
 * @type { import('gatsby').GatsbyNode['createPages'] }
 */
exports.createNotePage = async function createNotePage({
  actions: { createPage },
  graphql,
  reporter,
}) {
  const result = await graphql(`
    query {
      allNote {
        nodes {
          id
          slug
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  result.data.allNote.nodes.forEach((node) => {
    createPage({
      path: node.slug,
      component: noteTemplate,
      context: {
        id: node.id,
      },
    });
  });
};
