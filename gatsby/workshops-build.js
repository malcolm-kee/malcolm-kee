const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const { mdxResolverPassthrough } = require('./shared');

/**
 * Create `Lesson`node when mdx node is created.
 */
exports.createLessonNode = async ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode, createParentChildLink } = actions;

  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;

  if (source === 'workshops') {
    // use filename and directory name to generate path
    const { dir, name } = path.parse(fileNode.relativePath);
    const workshop = dir.split('/')[0];
    const slug = `/${workshop}/${name}`;

    const fieldsData = {
      title: node.frontmatter.title,
      slug,
      workshop,
      fileAbsolutePath: fileNode.absolutePath,
      section: node.frontmatter.section,
      keywords: node.frontmatter.keywords || [],
      updated_at: node.frontmatter.updated_at || node.frontmatter.date,
      description: node.frontmatter.description,
      isLastLesson: node.frontmatter.isLastLesson || false,
    };

    const lessonId = createNodeId(`${node.id} >>> Lesson`);

    await createNode({
      ...fieldsData,
      id: lessonId,
      parent: node.id,
      children: [],
      internal: {
        type: `Lesson`,
        contentDigest: createContentDigest(fieldsData),
        content: JSON.stringify(fieldsData),
      },
    });

    createParentChildLink({
      parent: node,
      child: getNode(lessonId),
    });
  }
};

const lessonTemplate = path.resolve(
  __dirname,
  '..',
  'src',
  'templates',
  'lesson-template.jsx'
);

const DISABLE_WORKSHOP = process.env.DISABLE_WORKSHOP;
const ONLY_WORKSHOP = process.env.ONLY_WORKSHOP;

function groupInstruction(edges) {
  const sectionsByKey = {};

  const nodes = edges.map(edge => edge.node);

  nodes.forEach(node => {
    if (sectionsByKey[node.section]) {
      sectionsByKey[node.section].push({
        title: node.title,
        slug: node.slug,
      });
    } else {
      sectionsByKey[node.section] = [
        {
          title: node.title,
          slug: node.slug,
        },
      ];
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
      allLesson(sort: { fields: fileAbsolutePath, order: ASC }) {
        edges {
          node {
            id
            title
            slug
            section
            isLastLesson
            workshop {
              id
              name
              themeColor
            }
          }
          next {
            slug
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    // group manually instead of relying on group in GraphQL as that will breaks hot-reload (no idea why)
    const groups = [];
    result.data.allLesson.edges.forEach(edge => {
      const groupIndex = groups.findIndex(
        group => group.workshop === edge.node.workshop.id
      );
      if (groupIndex > -1) {
        groups[groupIndex].edges.push(edge);
      } else {
        groups.push({
          workshop: edge.node.workshop.id,
          edges: [edge],
        });
      }
    });

    groups.forEach(group => {
      if (ONLY_WORKSHOP && group.workshop !== ONLY_WORKSHOP) {
        // optimize build
        return;
      }

      const lessonGroup = groupInstruction(group.edges);

      group.edges.forEach(({ node: lesson, next }, index, edges) => {
        createPage({
          path: lesson.slug,
          component: lessonTemplate,
          context: {
            // used in layout
            next:
              lesson.isLastLesson || index === edges.length - 1 ? null : next,
            lessonGroup,
            workshop: lesson.workshop,
            // used in template
            slug: lesson.slug,
            commentsSearch: `repo:malcolm-kee/malcolm-kee label:comment ${lesson.slug} in:title sort:created-asc`,
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
    `type WorkshopsYaml implements Node {
      underConstruction: Boolean
    }`,
    schema.buildObjectType({
      name: 'Lesson',
      interfaces: ['Node'],
      fields: {
        slug: {
          type: 'String!',
        },
        workshop: {
          type: 'WorkshopsYaml',
          extensions: {
            link: {},
          },
        },
        fileAbsolutePath: {
          type: 'String!',
        },
        updated_at: { type: `Date`, extensions: { dateformat: {} } },
        body: {
          type: `String!`,
          resolve: mdxResolverPassthrough('body'),
        },
        html: {
          type: `String!`,
          resolve: mdxResolverPassthrough('html'),
        },
        tableOfContents: {
          type: `JSON`,
          args: {
            maxDepth: {
              type: 'Int',
            },
          },
          resolve: mdxResolverPassthrough('tableOfContents'),
        },
      },
    }),
  ];

  createTypes(typeDefs);
};
