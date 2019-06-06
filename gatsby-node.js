const createBlogs = require('./gatsby/create-blogs');
const createWorkshops = require('./gatsby/create-workshops');
const onCreateMdxNode = require('./gatsby/on-create-mdx-node');

exports.onCreateNode = async ({ node, actions }) => {
  if (node.internal.type === 'Mdx') {
    await onCreateMdxNode({ node, actions });
  }
};

exports.createPages = async ({ actions, graphql }) => {
  await createBlogs({ actions, graphql });
  await createWorkshops({ actions, graphql });
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
