const {
  createBlogNode,
  createBlogs,
  createBlogSchemaCustomization,
} = require('./gatsby/blog-build');
const {
  createLessonNode,
  createWorkshopPages,
  createWorkshopSchemaCustomization,
} = require('./gatsby/workshops-build');
const {
  createTilNode,
  createTilSchemaCustomization,
  createTils,
} = require('./gatsby/til-build');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

exports.onCreateNode = async ({
  node,
  getNode,
  actions,
  reporter,
  createNodeId,
  createContentDigest,
}) => {
  if (node.internal.type === 'Mdx') {
    await Promise.all([
      createLessonNode({
        node,
        actions,
        getNode,
        createNodeId,
        createContentDigest,
      }),
      createBlogNode({
        node,
        actions,
        getNode,
        createNodeId,
        createContentDigest,
      }),
      createTilNode({
        node,
        actions,
        getNode,
        createNodeId,
        createContentDigest,
      }),
    ]);
  }
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  createWorkshopSchemaCustomization({ actions, schema });
  createBlogSchemaCustomization({ actions, schema });
  createTilSchemaCustomization({ actions, schema });
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  await Promise.all([
    createBlogs({ actions, graphql, reporter }),
    createWorkshopPages({ actions, graphql, reporter }),
    createTils({ actions, graphql }),
  ]);
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
    plugins: [
      new MonacoWebpackPlugin({
        languages: ['typescript'],
      }),
    ],
  });
};
