import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import remarkShikiTwoSlash from 'remark-shiki-twoslash';

// https://astro.build/config
export default defineConfig({
  site: 'https://malcolmkee.com',
  integrations: [
    react(),
    mdx(),
    tailwind(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    sitemap(),
  ],
  server: {
    port: 8989,
  },
  markdown: {
    remarkPlugins: [[remarkShikiTwoSlash.default, { theme: 'github-light' }]],
    extendDefaultPlugins: true,
    syntaxHighlight: false,
  },
  experimental: {
    contentCollections: true,
  },
});
