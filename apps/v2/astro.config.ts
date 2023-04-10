import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import robotsTxt from 'astro-robots-txt';
import webmanifest from 'astro-webmanifest';
import { defineConfig } from 'astro/config';
import { s } from 'hastscript';
import rehypeAutolinkHeadings, { type Options } from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import remarkShikiTwoSlash from 'remark-shiki-twoslash';
import { rehypeCodeImportPlugin, remarkCodeImportPlugin } from './plugin/code-import-plugins';
import { depsExtraction } from './plugin/deps-extraction';
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
    depsExtraction({
      routes: [/^blog\/[\w|-]+/],
      excludes: [/^https:\/\/www.googletagmanager.com/, /^https:\/\/f\.convertkit\.com/],
      serviceWorker: {
        templateUrl: new URL('src/templates/sw.js', import.meta.url),
        offlinePagePath: 'offline',
        outputFileName: 'sw.js',
      },
    }),
    robotsTxt({
      policy: [
        {
          userAgent: '*',
          allow: '/',
          disallow: '/offline/',
        },
      ],
    }),
    webmanifest({
      name: 'Malcolm Kee',
      short_name: 'Malcolm',
      icon: 'src/assets/app-icon.png',
      start_url: '/',
      description: 'Personal website of Malcolm Kee',
      display: 'standalone',
      theme_color: '#ffffff',
      background_color: '#27272a',
      config: {
        insertAppleTouchLinks: true,
        iconPurpose: ['any', 'maskable'],
      },
    }),
  ],
  server: {
    port: 8989,
  },
  markdown: {
    remarkPlugins: [
      remarkCodeImportPlugin,
      [
        // @ts-expect-error
        remarkShikiTwoSlash,
        {
          themes: ['github-light', 'github-dark'],
        },
      ],
    ],
    rehypePlugins: [
      rehypeCodeImportPlugin,
      [
        rehypeCloudinaryImageEnhance,
        {
          cloudinaryUsername: 'malcolm-kee',
        },
      ],
      [
        rehypeExternalLinks,
        {
          target: '_blank',
        },
      ],
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
                class: 'inline-block w-5 h-5',
              },
              s('path', {
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                d: 'M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244',
              })
            );
          },
          properties: {
            class:
              'inline-flex items-center ml-2 text-zinc-300 hover:text-primary-500 focus:text-primary-500 transition',
            tabindex: '-1',
            'aria-hidden': 'true',
          },
        } satisfies Options,
      ],
    ],
    syntaxHighlight: false,
  },
  experimental: {
    assets: true,
  },
});
