const {
  createLessonNode,
  createWorkshopPages,
  createWorkshopSchemaCustomization,
} = require('./gatsby/workshops-build');
const { setupWebpackConfigForWorker } = require('./gatsby/worker-build');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

exports.onCreateNode = async (createNodeParam) => {
  if (createNodeParam.node.internal.type === 'Mdx') {
    await Promise.all([createLessonNode(createNodeParam)]);
  }
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  createWorkshopSchemaCustomization({ actions, schema });
};

exports.createPages = async (createPageArgs) => {
  await Promise.all([createWorkshopPages(createPageArgs)]);
};

/**
 * @type {import('gatsby').GatsbyNode['onCreateWebpackConfig']}
 */
exports.onCreateWebpackConfig = (args, options) => {
  // switching buble to '@philpl/buble' to reduce bundle size
  // but does not support ESNext regex. See https://github.com/FormidableLabs/react-live#what-bundle-size-can-i-expect
  args.actions.setWebpackConfig({
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
  setupWebpackConfigForWorker(args, options);
};
