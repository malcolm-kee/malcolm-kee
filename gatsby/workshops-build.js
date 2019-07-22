const fs = require('fs');
const path = require('path');

const instructionTemplate = path.resolve(
  __dirname,
  '..',
  'src',
  'templates',
  'instruction-template.jsx'
);

const DISABLE_WORKSHOP = process.env.DISABLE_WORKSHOP;
const ONLY_WORKSHOP = process.env.ONLY_WORKSHOP;

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
    nodes: sectionsByKey[title],
  }));
}

exports.createWorkshopPages = function createWorkshopPages({
  actions,
  graphql,
}) {
  if (DISABLE_WORKSHOP) {
    // optimize local build time
    return;
  }

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
              fields {
                slug
              }
            }
            next {
              fields {
                slug
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
            iconFile {
              childImageSharp {
                resize(width: 16, height: 16) {
                  src
                }
              }
            }
            image: iconFile {
              childImageSharp {
                resize(width: 300, height: 157) {
                  src
                }
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

    const groups = result.data.allMdx.group.filter(
      group => !ONLY_WORKSHOP || group.workshop === ONLY_WORKSHOP
    );

    const workshops = result.data.allWorkshopsJson.edges.map(edge => edge.node);

    groups.forEach(group => {
      const workshop = workshops.filter(
        workshop => workshop.contentId === group.workshop
      )[0];

      const lessonGroup = groupInstruction(group.edges);

      group.edges.forEach(({ node: lesson, next }) => {
        createPage({
          path: lesson.fields.slug,
          component: instructionTemplate,
          context: {
            next: lesson.frontmatter.title === 'Conclusion' ? null : next, // hard-code to remove next for conclusion
            lessonGroup,
            isWorkshop: true,
            workshopTitle: workshop && workshop.name,
            workshopThemeColor: workshop && workshop.themeColor,
            workshopIcon:
              workshop &&
              workshop.iconFile &&
              workshop.iconFile.childImageSharp.resize.src,
            workshopImage:
              workshop &&
              workshop.image &&
              workshop.image.childImageSharp.resize.src,
            workshopId: workshop && workshop.contentId,
            id: lesson.id,
            workshop: group.workshop,
            commentsSearch: `repo:malcolm-kee/malcolm-kee label:comment ${lesson.fields.slug} in:title sort:created-asc`,
          },
        });
      });
    });
  });
};

exports.createWorkshopNodeFields = function createWorkshopNodeFields({
  node,
  actions,
  getNode,
  reporter,
}) {
  const { createNodeField } = actions;

  const lessonPath = node.frontmatter && node.frontmatter.path;
  const fileNode = getNode(node.parent);
  const isWorkshop = fileNode.sourceInstanceName === 'workshops';
  if (isWorkshop) {
    // use filename and directory name to generate path
    const { dir, name } = path.parse(fileNode.relativePath);
    const workshop = dir.split('/')[0];
    if (workshop) {
      createNodeField({
        node,
        name: 'contentgroup',
        value: workshop,
      });
      createNodeField({
        node,
        name: 'slug',
        value: `/${workshop}/${name}`,
      });
    }
  }
  createNodeField({
    node,
    name: 'workshopcontent',
    value: isWorkshop,
  });
};
