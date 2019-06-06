const path = require('path');
const instructionTemplate = path.resolve(
  __dirname,
  '..',
  'src',
  'templates',
  'instruction-template.jsx'
);

module.exports = function createWorkshops({ actions, graphql }) {
  const { createPage } = actions;
  return graphql(`
    {
      allMdx(
        filter: { fields: { workshopcontent: { eq: true } } }
        sort: { fields: [fileAbsolutePath] }
      ) {
        group(field: fields___contentgroup) {
          workshop: fieldValue
          edges {
            node {
              id
              frontmatter {
                path
                section
                title
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
      allWorkshopsJson {
        edges {
          node {
            contentId
            name
            themeColor
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const groups = result.data.allMdx.group;
    const workshops = result.data.allWorkshopsJson.edges.map(edge => edge.node);

    groups.forEach(group => {
      const workshop = workshops.filter(
        workshop => workshop.contentId === group.workshop
      )[0];

      const lessonGroup = groupInstruction(group.edges);

      group.edges.forEach(({ node: lesson, next }) => {
        createPage({
          path: lesson.frontmatter.path,
          component: instructionTemplate,
          context: {
            next,
            lessonGroup,
            isWorkshop: true,
            workshopTitle: workshop && workshop.name,
            workshopThemeColor: workshop && workshop.themeColor,
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

function groupInstruction(edges) {
  const sectionsByKey = {};

  const nodes = edges.map(edge => edge.node);

  nodes.forEach(node => {
    if (sectionsByKey[node.frontmatter.section]) {
      sectionsByKey[node.frontmatter.section].push(node);
    } else {
      sectionsByKey[node.frontmatter.section] = [node];
    }
  });

  return Object.keys(sectionsByKey).map(title => ({
    title,
    nodes: sectionsByKey[title]
  }));
}
