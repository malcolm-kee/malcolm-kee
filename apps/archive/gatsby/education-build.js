const fs = require('fs');
const path = require('path');
const invert = require('invert-color');
const slugify = require('slugify');
const { mdxResolverPassthrough } = require('./shared');

const sl = text =>
  slugify(text, {
    lower: true,
  });

/**
 * Create `Education` node when mdx node is created.
 *
 * @type import('gatsby').GatsbyNode['onCreateNode']
 */
exports.createEducationNode = async ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode, createParentChildLink } = actions;

  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;

  if (source === 'education') {
    // use filename and directory name to generate path
    const { dir, name } = path.parse(fileNode.relativePath);
    const subject = dir.split('/')[0];
    const { frontmatter } = node;

    const fieldsData = {
      title: frontmatter.title,
      chapter: frontmatter.chapter,
      slug: `/${subject}/${sl(frontmatter.chapter)}/${sl(frontmatter.title)}`,
      subject,
      fileAbsolutePath: fileNode.absolutePath,
      section: frontmatter.section,
      keywords: frontmatter.keywords || [],
      updated_at: frontmatter.updated_at || frontmatter.date,
      description: frontmatter.description,
      objectives: frontmatter.objectives,
    };

    const educationId = createNodeId(`${node.id} >>> Education`);

    await createNode({
      ...fieldsData,
      id: educationId,
      parent: node.id,
      children: [],
      internal: {
        type: `Education`,
        contentDigest: createContentDigest(fieldsData),
        content: JSON.stringify(fieldsData),
      },
    });

    createParentChildLink({
      parent: node,
      child: getNode(educationId),
    });
  }
};

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createEduSchemaCustomization = function createEduSchemaCustomization({
  actions,
  schema,
}) {
  const { createTypes } = actions;
  const typeDefs = [
    schema.buildObjectType({
      name: 'Education',
      interfaces: ['Node'],
      fields: {
        slug: {
          type: 'String!',
        },
        subject: {
          type: 'SubjectsYaml',
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
        objectives: {
          type: `[String]`,
        },
      },
    }),
  ];

  createTypes(typeDefs);
};

const DISABLE_EDU = process.env.DISABLE_EDU;

const eduTemplate = path.resolve(
  __dirname,
  '..',
  'src',
  'templates',
  'education-template.jsx'
);

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createEduPages = function createEduPages({
  actions,
  graphql,
  reporter,
}) {
  if (DISABLE_EDU) {
    reporter.info(`DISABLE_EDU is set, no education content will be created`);
    return;
  }
  const { createPage } = actions;

  return graphql(`
    {
      allEducation(sort: { order: ASC, fields: fileAbsolutePath }) {
        edges {
          node {
            id
            slug
            subject {
              name
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw new Error(result.errors);
    }

    result.data.allEducation.edges.forEach(({ node }) => {
      createPage({
        path: node.slug,
        component: eduTemplate,
        context: {
          slug: node.slug,
          subject: node.subject,
        },
      });
    });
  });
};
