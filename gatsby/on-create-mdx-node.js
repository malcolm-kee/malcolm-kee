module.exports = function onCreateMdxNode({ node, actions }) {
  const { createNodeField } = actions;

  const path = node.frontmatter && node.frontmatter.path;
  if (path) {
    const sections = path.split('/');
    const contentGroup = sections[sections.length - 2];
    if (contentGroup) {
      createNodeField({
        node,
        name: 'contentgroup',
        value: contentGroup
      });
      createNodeField({
        node,
        name: 'workshopcontent',
        value: contentGroup !== 'blog'
      });
    }
  }
};
