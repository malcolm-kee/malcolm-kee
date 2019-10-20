const fs = require('fs');
const path = require('path');
const {
  createBlogNode,
  createBlogs,
  createBlogSchemaCustomization,
} = require('./gatsby/blog-build');
const {
  createLessonNode,
  createWorkshopPages,
  createWorkshopSchemaCustomization,
} = require('./gatsby/workshops-build');
const {
  createTilNode,
  createTilSchemaCustomization,
  createTils,
} = require('./gatsby/til-build');
const { screenshot } = require('./gatsby/screenshot');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

exports.onCreateNode = async ({
  node,
  getNode,
  actions,
  reporter,
  createNodeId,
  createContentDigest,
}) => {
  if (node.internal.type === 'Mdx') {
    await Promise.all([
      createLessonNode({
        node,
        actions,
        getNode,
        createNodeId,
        createContentDigest,
      }),
      createBlogNode({
        node,
        actions,
        getNode,
        createNodeId,
        createContentDigest,
      }),
      createTilNode({
        node,
        actions,
        getNode,
        createNodeId,
        createContentDigest,
      }),
    ]);
  }
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  createWorkshopSchemaCustomization({ actions, schema });
  createBlogSchemaCustomization({ actions, schema });
  createTilSchemaCustomization({ actions, schema });
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  await Promise.all([
    createBlogs({ actions, graphql, reporter }),
    createWorkshopPages({ actions, graphql, reporter }),
    createTils({ actions, graphql }),
  ]);
};

exports.onCreateWebpackConfig = ({ actions }) => {
  // switching buble to '@philpl/buble' to reduce bundle size
  // but does not support ESNext regex. See https://github.com/FormidableLabs/react-live#what-bundle-size-can-i-expect
  actions.setWebpackConfig({
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
      allTil {
        nodes {
          title
          date(formatString: "MMM DD, YYYY")
          slug
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

  const nodes = result.data.allTil.nodes;
  const blogNodes = result.data.allBlogPost.nodes.map(node => ({
    slug: node.slug,
    title: node.title,
    icon: node.previewImage.image,
  }));
  const lessonNodes = result.data.allLesson.nodes.map(node => ({
    slug: node.slug,
    title: node.title,
    subtitle: node.workshop.name,
    icon: node.workshop.iconFile,
  }));
  const workshops = result.data.workshops.nodes.map(node => ({
    slug: `/${node.id}`,
    title: node.title,
    icon: node.icon,
  }));

  await Promise.all([
    screenshot(
      { nodes, reporter },
      {
        template: path.resolve(__dirname, 'og-image-template', 'basic.html'),
      }
    ),
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
