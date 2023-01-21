const fs = require('fs');
const path = require('path');
const {
  createNoteNode,
  createNoteSchemaCustomization,
  createNotePage,
} = require('./gatsby/note-build');
const {
  createLessonNode,
  createWorkshopPages,
  createWorkshopSchemaCustomization,
} = require('./gatsby/workshops-build');
const { screenshot } = require('./gatsby/screenshot');
const { setupWebpackConfigForWorker } = require('./gatsby/worker-build');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

exports.onCreateNode = async (createNodeParam) => {
  if (createNodeParam.node.internal.type === 'Mdx') {
    await Promise.all([
      createLessonNode(createNodeParam),
      createNoteNode(createNodeParam),
    ]);
  }
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  createWorkshopSchemaCustomization({ actions, schema });
  createNoteSchemaCustomization({ actions, schema });
};

exports.createPages = async (createPageArgs) => {
  await Promise.all([
    createWorkshopPages(createPageArgs),
    createNotePage(createPageArgs),
  ]);
};

/**
 * @type {import('gatsby').GatsbyNode['onCreateWebpackConfig']}
 */
exports.onCreateWebpackConfig = (args, options) => {
  // switching buble to '@philpl/buble' to reduce bundle size
  // but does not support ESNext regex. See https://github.com/FormidableLabs/react-live#what-bundle-size-can-i-expect
  args.actions.setWebpackConfig({
    resolve: {
      alias: {
        buble: '@philpl/buble',
      },
    },
    plugins: [
      new MonacoWebpackPlugin({
        languages: ['typescript'],
      }),
    ],
  });
  setupWebpackConfigForWorker(args, options);
};

exports.onPostBuild = async ({ graphql, reporter }) => {
  reporter.info(`Start generating social media preview images`);

  const result = await graphql(`
    {
      allLesson {
        nodes {
          slug
          title
          workshop {
            name
            iconFile {
              absolutePath
              extension
            }
          }
        }
      }
      workshops: allWorkshopsYaml {
        nodes {
          id
          title: name
          icon: iconFile {
            absolutePath
            extension
          }
        }
      }
    }
  `);

  if (result.errors) {
    return reporter.error(result.errors);
  }

  const lessonNodes = result.data.allLesson.nodes.map((node) => ({
    slug: node.slug,
    title: node.title,
    subtitle: node.workshop.name,
    icon: node.workshop.iconFile,
  }));
  const workshops = result.data.workshops.nodes.map((node) => ({
    slug: `/${node.id}`,
    title: node.title,
    icon: node.icon,
  }));

  await Promise.all([
    screenshot(
      { nodes: lessonNodes, reporter },
      {
        template: path.resolve(__dirname, 'og-image-template', 'workshop.html'),
      }
    ),
    screenshot(
      { nodes: workshops, reporter },
      {
        template: path.resolve(__dirname, 'og-image-template', 'workshop.html'),
      }
    ),
  ]);

  reporter.info(`Done generating social media preview images`);
};
