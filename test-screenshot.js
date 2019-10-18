const path = require('path');
const fs = require('fs');
const { screenshot } = require('./gatsby/screenshot');

const iconPath = path.resolve(__dirname, 'src', 'assets', 'gatsbyjs.png');

screenshot(
  {
    nodes: [
      {
        title: 'Create Page From Data',
        subtitle: 'Create a Fast Site with GatsbyJS',
        slug: '/a/aatest-test',
        background: '#663399',
        color: '#ffffff',
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
