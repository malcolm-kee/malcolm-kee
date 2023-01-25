import { z, defineCollection } from 'astro:content';

export const collections = {
  note: defineCollection({
    schema: z.object({
      title: z.string(),
    }),
  }),
  workshop: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      section: z.string().optional(),
    }),
  }),
};
