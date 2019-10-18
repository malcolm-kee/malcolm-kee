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
            themeColor
            iconFile {
              absolutePath
              extension
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    return reporter.error(result.errors);
  }

  const nodes = result.data.allBlogPost.nodes.concat(result.data.allTil.nodes);
  const lessonNodes = result.data.allLesson.nodes.map(node => ({
    slug: node.slug,
    title: node.title,
    subtitle: node.workshop.name,
    background: node.workshop.themeColor,
    color: getContrastTextColor(node.workshop.themeColor),
    icon: node.workshop.iconFile,
  }));

  await Promise.all([
    screenshot(
      { nodes, reporter },
      {
        template: path.resolve(__dirname, 'og-image-template', 'basic.html'),
      }
    ),
    screenshot(
      { nodes: lessonNodes, reporter },
      {
        template: path.resolve(__dirname, 'og-image-template', 'workshop.html'),
      }
    ),
  ]);

  reporter.info(`Done generating social media preview images`);
};

function getContrastTextColor(hex) {
  const threshold = 130; /* about half of 256. Lower threshold equals more dark text on dark background  */

  const hRed = hexToR(hex);
  const hGreen = hexToG(hex);
  const hBlue = hexToB(hex);

  const cBrightness = (hRed * 299 + hGreen * 587 + hBlue * 114) / 1000;
  return cBrightness > threshold ? '#000000' : '#ffffff';
}

function cutHex(h) {
  return h.charAt(0) === '#' ? h.substring(1, 7) : h;
}
function hexToR(h) {
  return parseInt(cutHex(h).substring(0, 2), 16);
}
function hexToG(h) {
  return parseInt(cutHex(h).substring(2, 4), 16);
}
function hexToB(h) {
  return parseInt(cutHex(h).substring(4, 6), 16);
}
