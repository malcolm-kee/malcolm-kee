import { getCollection } from 'astro:content';
import type { Topic } from './topic-types';

export const getBlogs = async ({
  includePreview = false,
  includeDraft = false,
  topics,
}: {
  includePreview?: boolean;
  includeDraft?: boolean;
  topics?: Array<Topic>;
} = {}) => {
  const blogs = await getCollection('blog', ({ data }) => {
    return (
      (includePreview || !data.preview) &&
      (includeDraft || !data.draft) &&
      (!topics || topics.some((topic) => data.topics?.includes(topic)))
    );
  });

  return blogs
    .slice(0)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
};
