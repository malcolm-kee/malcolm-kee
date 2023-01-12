import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://malcolmkee.com',
  integrations: [react(), mdx(), tailwind(), partytown(), sitemap()],
});
