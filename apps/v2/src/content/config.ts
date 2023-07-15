import { defineCollection, z } from 'astro:content';
import { TopicLabel, topic } from '../data/topic-types';
import { isFuture } from '../lib/date';

const pubDate = z.string().transform((v) => new Date(v));
const updatedDate = z
  .string()
  .transform((date) => new Date(date))
  .optional();

export const collections = {
  note: defineCollection({
    schema: z
      .object({
        title: z.string(),
        topics: z.array(topic).optional(),
        pubDate,
        updatedDate,
        description: z.string().optional(),
        /**
         * when true, the note page will be created
         * but it will not be listed
         */
        preview: z.boolean().optional(),
      })
      .transform((values) => ({
        ...values,
        displayedTopics:
          values.topics &&
          values.topics.map((topic) => ({
            value: topic,
            label: TopicLabel[topic],
          })),
      })),
  }),
  workshop: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      section: z.string().optional(),
      order: z.number().optional(),
    }),
  }),
  blog: defineCollection({
    schema: z
      .object({
        title: z.string(),
        pubDate,
        updatedDate,
        description: z.string().optional(),
        lang: z.union([z.literal('zh-Hans'), z.literal('en-US')]).default('en-US'),
        /** cloudinary public id for the hero image */
        heroImagePublicId: z.string().optional(),
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
        topics: z.array(topic).optional(),
      })
      .transform((values) => ({
        ...values,
        preview: values.preview || isFuture(values.pubDate),
        displayedTopics:
          values.topics &&
          values.topics.map((topic) => ({
            value: topic,
            label: TopicLabel[topic],
          })),
      })),
  }),
  'today-i-learnt': defineCollection({
    schema: z
      .object({
        title: z.string(),
        pubDate,
        updatedDate,
        topics: z.array(topic),
        /**
         * when true, the til page will be created
         * but it will not be listed
         */
        preview: z.boolean().optional(),
        youtubeVideoId: z.string().optional(),
      })
      .transform((values) => ({
        ...values,
        preview: values.preview || isFuture(values.pubDate),
        displayedTopics:
          values.topics &&
          values.topics.map((topic) => ({
            value: topic,
            label: TopicLabel[topic],
          })),
      })),
  }),
};
