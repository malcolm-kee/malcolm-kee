const fs = require('fs');
const path = require('path');
const {
  createBlogNode,
  createBlogs,
  createBlogSchemaCustomization,
} = require('./gatsby/blog-build');
const {
  createEducationNode,
  createEduPages,
  createEduSchemaCustomization,
} = require('./gatsby/education-build');
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
      createEducationNode(createNodeParam),
      createLessonNode(createNodeParam),
      createBlogNode(createNodeParam),
      createNoteNode(createNodeParam),
    ]);
  }
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  createWorkshopSchemaCustomization({ actions, schema });
  createBlogSchemaCustomization({ actions, schema });
  createEduSchemaCustomization({ actions, schema });
  createNoteSchemaCustomization({ actions, schema });

  const fallbackTypes = [
    `type NpmsIoMalcolmLinks {
      homepage: String
    }

    type NpmsIoMalcolm implements Node {
      name: String!
      version: String
      description: String
      date: Date @dateformat
      links: NpmsIoMalcolmLinks
    }`,
  ];

  actions.createTypes(fallbackTypes);
};

exports.createPages = async (createPageArgs) => {
  await Promise.all([
    createBlogs(createPageArgs),
    createWorkshopPages(createPageArgs),
    createEduPages(createPageArgs),
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
      allBlogPost {
        nodes {
          title
          date(formatString: "MMM DD, YYYY")
          slug
          previewImage {
            image {
              absolutePath
              extension
            }
          }
        }
      }
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

  const blogNodes = result.data.allBlogPost.nodes.map((node) => ({
    slug: node.slug,
    title: node.title,
    icon: node.previewImage.image,
  }));
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
      {
        nodes: blogNodes,
        reporter,
      },
      {
        template: path.resolve(__dirname, 'og-image-template', 'blog.html'),
      }
    ),
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
