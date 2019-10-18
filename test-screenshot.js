const path = require('path');
const fs = require('fs');
const { screenshot } = require('./gatsby/screenshot');

const iconPath = path.resolve(__dirname, 'src', 'assets', 'gatsbyjs.png');

/*
This file is used for development for the SEO image generation only.
*/

(async function run() {
  try {
    await screenshot(
      {
        nodes: [
          {
            title: 'Create a Fast Site with GatsbyJS',
            slug: '/fast-site-with-gatsby-js',
            icon: {
              extension: 'png',
              absolutePath: iconPath,
            },
          },
        ],
        reporter: console,
      },
      {
        template: path.resolve(__dirname, 'og-image-template', 'workshop.html'),
      }
    );
  } catch (e) {
    console.error(`caught error`);
    console.error(e);
  }
})();
