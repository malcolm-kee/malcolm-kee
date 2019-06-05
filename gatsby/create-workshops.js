const path = require('path');
const blogPostTemplate = path.resolve(
  __dirname,
  '..',
  'src',
  'templates',
  'blog-template.jsx'
);

module.exports = function createWorkshops({ actions, graphql }) {
  const { createPage } = actions;
  return graphql(`
    {
      allMdx(
        filter: { fields: { contentgroup: { ne: "blog" } } }
        sort: { fields: [fileAbsolutePath] }
      ) {
        group(field: fields___contentgroup) {
          workshop: fieldValue
          edges {
            node {
              id
              frontmatter {
                path
              }
            }
            next {
              frontmatter {
                path
              }
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const groups = result.data.allMdx.group;

    groups.forEach(group => {
      group.edges.forEach(({ node: lesson, next }) => {
        createPage({
          path: lesson.frontmatter.path,
          component: blogPostTemplate,
          context: {
            next,
            id: lesson.id,
            workshop: group.workshop,
            commentsSearch: `repo:malcolm-kee/malcolm-kee label:comment ${
              lesson.frontmatter.path
            } in:title sort:created-asc`
          }
        });
      });
    });
  });
};
