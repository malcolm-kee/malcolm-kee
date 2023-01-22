import { z, defineCollection } from 'astro:content';

export const collections = {
  note: defineCollection({
    schema: {
      title: z.string(),
    },
  }),
};
