const {
  createBlogNode,
  createBlogs,
  createBlogSchemaCustomization,
} = require('./gatsby/blog-build');
const {
  createWorkshopPages,
  createWorkshopNodeFields,
  createWorkshopSchemaCustomization,
} = require('./gatsby/workshops-build');

exports.onCreateNode = async ({
  node,
  getNode,
  actions,
  reporter,
  createNodeId,
  createContentDigest,
}) => {
  if (node.internal.type === 'Mdx') {
    await createWorkshopNodeFields({ node, actions, getNode, reporter });
    await createBlogNode({
      node,
      actions,
      getNode,
      createNodeId,
      createContentDigest,
    });
  }
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  createWorkshopSchemaCustomization({ actions, schema });
  createBlogSchemaCustomization({ actions, schema });
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  await createBlogs({ actions, graphql, reporter });
  await createWorkshopPages({ actions, graphql, reporter });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  // switching buble to '@philpl/buble' to reduce bundle size
  // but does not support ESNext regex. See https://github.com/FormidableLabs/react-live#what-bundle-size-can-i-expect
  actions.setWebpackConfig({
    resolve: {
      alias: {
        buble: '@philpl/buble',
      },
    },
  });
};
