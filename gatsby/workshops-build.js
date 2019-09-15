const fs = require('fs');
const _ = require('lodash');
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
  reporter,
}) {
  if (DISABLE_WORKSHOP) {
    // optimize local build time
    reporter.info(
      `DISABLE_WORKSHOP env var is set, no workshop content will be created`
    );
    return;
  }

  const { createPage } = actions;
  return graphql(`
    {
      allMdx(
        filter: { workshop: { id: { ne: null } } }
        sort: { fields: [fileAbsolutePath] }
      ) {
        group(field: workshop___id) {
          workshop: fieldValue
          edges {
            node {
              id
              frontmatter {
                path
                section
                title
                isLastLesson
              }
              fields {
                slug
              }
              workshop {
                id
                name
                themeColor
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
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    reporter.info(
      `obtain Mdx group: [${result.data.allMdx.group.length}];
      ONLY_WORKSHOP env var: [${ONLY_WORKSHOP}]`
    );

    const groups = result.data.allMdx.group.filter(
      group => !ONLY_WORKSHOP || group.workshop === ONLY_WORKSHOP
    );

    groups.forEach(group => {
      const lessonGroup = groupInstruction(group.edges);

      group.edges.forEach(({ node: lesson, next }) => {
        createPage({
          path: lesson.fields.slug,
          component: instructionTemplate,
          context: {
            // used in layout
            next: lesson.frontmatter.isLastLesson ? null : next, // hard-code to remove next for conclusion
            lessonGroup,
            isWorkshop: true,
            workshopId: lesson.workshop.id,
            workshopTitle: lesson.workshop.name,
            workshopThemeColor: lesson.workshop.themeColor,
            // used in template
            id: lesson.id,
            commentsSearch: `repo:malcolm-kee/malcolm-kee label:comment ${lesson.fields.slug} in:title sort:created-asc`,
          },
        });
      });
    });
  });
};

exports.createWorkshopSchemaCustomization = function createWorkshopSchemaCustomization({
  actions,
  schema,
}) {
  const { createTypes } = actions;
  const typeDefs = [
    `type WorkshopsJson implements Node {
      underConstruction: Boolean
    }`,
    schema.buildObjectType({
      name: 'Mdx',
      interfaces: ['Node'],
      fields: {
        workshop: {
          type: 'WorkshopsJson',
          resolve: (source, args, context, info) => {
            const fileNode = context.nodeModel.getNodeById({
              id: source.parent,
              type: 'File',
            });

            if (!fileNode || fileNode.sourceInstanceName !== 'workshops') {
              return null;
            }

            const workshopId = fileNode.relativeDirectory.split('/')[0];

            return workshopId
              ? context.nodeModel.getNodeById({
                  id: workshopId,
                  type: 'WorkshopsJson',
                })
              : null;
          },
        },
      },
    }),
  ];

  createTypes(typeDefs);
};

exports.createWorkshopNodeFields = function createWorkshopNodeFields({
  node,
  actions,
  getNode,
  reporter,
}) {
  const { createNodeField } = actions;

  const fileNode = getNode(node.parent);
  const isWorkshop = fileNode.sourceInstanceName === 'workshops';
  if (isWorkshop) {
    // use filename and directory name to generate path
    const { dir, name } = path.parse(fileNode.relativePath);
    const workshop = dir.split('/')[0];
    if (workshop) {
      createNodeField({
        node,
        name: 'slug',
        value: `/${workshop}/${name}`,
      });
    }
  }
};
