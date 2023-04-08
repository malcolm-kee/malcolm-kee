import { extractDependencies } from './index';

extractDependencies(
  new URL('file:///Users/malcolmkee/side-project/malcolm-kee/apps/v2/dist/offline/index.html'),
  {
    root: new URL('file:///Users/malcolmkee/side-project/malcolm-kee/apps/v2/dist/'),
    excludes: [/^https:\/\/www.googletagmanager.com/],
  }
).then(console.log);
