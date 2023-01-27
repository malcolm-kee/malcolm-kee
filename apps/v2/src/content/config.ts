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
  blog: defineCollection({
    schema: z.object({
      title: z.string(),
      pubDate: z.string(),
      updatedDate: z.string().optional(),
      description: z.string().optional(),
      lang: z.union([z.literal('zh-Hans'), z.literal('en')]).optional(),
      heroImage: z.string().optional(),
      alt: z.string().optional(),
      /**
       * when true, the blog page will be created
       * but it will not be listed
       */
      preview: z.boolean().optional(),
      /**
       * when true, the blog post will not be created
       * nor listed
       */
      draft: z.boolean().optional(),
    }),
  }),
  'today-i-learnt': defineCollection({
    schema: z.object({
      title: z.string(),
      pubDate: z.string(),
      updatedDate: z.string().optional(),
      topics: z.array(z.string()),
      /**
       * when true, the til page will be created
       * but it will not be listed
       */
      preview: z.boolean().optional(),
    }),
  }),
};
