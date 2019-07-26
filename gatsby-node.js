const createBlogs = require('./gatsby/create-blogs');
const {
  createWorkshopPages,
  createWorkshopNodeFields,
} = require('./gatsby/workshops-build');

exports.onCreateNode = async ({ node, getNode, actions, reporter }) => {
  if (node.internal.type === 'Mdx') {
    await createWorkshopNodeFields({ node, actions, getNode, reporter });
  }
};

exports.createPages = async ({ actions, graphql }) => {
  await createBlogs({ actions, graphql });
  await createWorkshopPages({ actions, graphql });
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
