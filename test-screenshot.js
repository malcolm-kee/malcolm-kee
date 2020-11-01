const path = require('path');
const fs = require('fs');
const { screenshot } = require('./gatsby/screenshot');

const imagePath = path.resolve(
  __dirname,
  'blogs',
  '2019',
  '09',
  'photo-malaysia.jpg'
);

/*
This file is used for development for the SEO image generation only.
*/

(async function run() {
  try {
    await screenshot(
      {
        nodes: [
          {
            title: 'How to become a racist',
            slug: 'a/a',
            icon: {
              extension: 'jpg',
              absolutePath: imagePath,
            },
          },
        ],
        reporter: console,
      },
      {
        template: path.resolve(__dirname, 'og-image-template', 'blog.html'),
      }
    );
  } catch (e) {
    console.error(`caught error`);
    console.error(e);
  }
})();
