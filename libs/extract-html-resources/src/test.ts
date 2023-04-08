import { extractDependencies } from './index';

const root = new URL('file:///Users/malcolmkee/side-project/malcolm-kee/apps/v2/dist/');

extractDependencies(new URL('blog/comfort-zone/index.html', root), {
  root,
  excludes: [/^https:\/\/www.googletagmanager.com/],
}).then(console.log);
