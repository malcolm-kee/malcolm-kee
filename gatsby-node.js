const createBlogs = require('./gatsby/create-blogs');
const {
  createWorkshopPages,
  createWorkshopNodeFields,
} = require('./gatsby/workshops-build');

exports.onCreateNode = async ({ node, actions }) => {
  if (node.internal.type === 'Mdx') {
    await createWorkshopNodeFields({ node, actions });
  }
};

exports.createPages = async ({ actions, graphql }) => {
  await createBlogs({ actions, graphql });
  await createWorkshopPages({ actions, graphql });
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  if (page.path === '/') {
    const oldPage = Object.assign({}, page);
    page.context.isRoot = true;
    deletePage(oldPage);
    createPage(page);
  }
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
