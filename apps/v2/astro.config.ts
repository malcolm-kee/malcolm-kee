import { defineConfig } from 'astro/config';

import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import rehypeAutolinkHeadings, { type Options } from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import { s } from 'hastscript';
import remarkShikiTwoSlash from 'remark-shiki-twoslash';
import { rehypeCloudinaryImageEnhance } from './plugin/rehype-cloudinary-image-enhance';

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
    remarkPlugins: [
      // @ts-expect-error
      [remarkShikiTwoSlash, { themes: ['github-light', 'github-dark'] }],
    ],
    rehypePlugins: [
      [rehypeCloudinaryImageEnhance, { cloudinaryUsername: 'malcolm-kee' }],
      [rehypeExternalLinks, { target: '_blank' }],
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          content() {
            return s(
              'svg',
              {
                viewBox: '0 0 24 24',
                strokeWidth: '1.5',
                stroke: 'currentColor',
                fill: 'none',
                width: 24,
                height: 24,
                class:
                  'inline-block ml-2 w-5 h-5 text-zinc-300 hover:text-primary-500',
              },
              s('path', {
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                d: 'M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244',
              })
            );
          },
        } satisfies Options,
      ],
    ],
    syntaxHighlight: false,
  },
});
