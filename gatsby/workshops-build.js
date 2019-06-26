const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

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
            iconFile
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
          path: lesson.frontmatter.path,
          component: instructionTemplate,
          context: {
            next: lesson.frontmatter.title === 'Conclusion' ? null : next, // hard-code to remove next for conclusion
            lessonGroup,
            isWorkshop: true,
            workshopTitle: workshop && workshop.name,
            workshopThemeColor: workshop && workshop.themeColor,
            workshopIcon: workshop && workshop.iconFile,
            workshopId: workshop && workshop.contentId,
            id: lesson.id,
            workshop: group.workshop,
            commentsSearch: `repo:malcolm-kee/malcolm-kee label:comment ${lesson.frontmatter.path} in:title sort:created-asc`,
          },
        });
      });
    });
  });
};

exports.createWorkshopNodeFields = function createWorkshopNodeFields({
  node,
  actions,
}) {
  const { createNodeField } = actions;

  const path = node.frontmatter && node.frontmatter.path;
  if (path) {
    const sections = path.split('/');
    const contentGroup = sections[sections.length - 2];
    if (contentGroup) {
      createNodeField({
        node,
        name: 'contentgroup',
        value: contentGroup,
      });
      createNodeField({
        node,
        name: 'workshopcontent',
        value: contentGroup !== 'blog',
      });
    }
  }
};

function ensureIconFolders(workshops) {
  return Promise.all(
    workshops.map(
      workshop =>
        new Promise((fulfill, reject) => {
          const iconFolder = path.join(`public`, workshop.contentId);

          if (fs.existsSync(iconFolder)) {
            fulfill();
          } else {
            fs.mkdir(iconFolder, err => {
              if (err) {
                return reject(err);
              }

              fulfill();
            });
          }
        })
    )
  );
}

const iconSizes = [16, 32, 64];

function generateIcons(workshops) {
  return Promise.all(
    workshops.map(workshop => {
      return Promise.all(
        iconSizes.map(size => {
          const imgPath = path.join(
            `public`,
            workshop.contentId,
            `icon-${size}x${size}.png`
          );

          const density = Math.min(2400, Math.max(1, size));

          return sharp(workshop.iconFile, { density })
            .resize({
              width: size,
              height: size,
              fit: `contain`,
              background: { r: 255, g: 255, b: 255, alpha: 0 },
            })
            .toFile(imgPath);
        })
      );
    })
  );
}

/**
 * This will generates icons for workshops in public folder:
 * - '/<workshopId>/-16x16.png'
 * - '/<workshopId>/-32x32.png'
 * - '/<workshopId>/-64x64.png'
 */
exports.createWorkshopIcons = async function createWorkshopIcons({
  getNodesByType,
}) {
  const workshops = getNodesByType('WorkshopsJson');
  const workshopsWithIcon = workshops.filter(workshop => !!workshop.iconFile);

  await ensureIconFolders(workshopsWithIcon);
  await generateIcons(workshopsWithIcon);
};
