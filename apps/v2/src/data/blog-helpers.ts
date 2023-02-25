import { getCollection } from 'astro:content';
import type { Topic } from './topic-helpers';

export const getBlogs = async ({
  includePreview = false,
  includeDraft = false,
  onlyTopic,
}: {
  includePreview?: boolean;
  includeDraft?: boolean;
  onlyTopic?: Topic;
} = {}) => {
  const blogs = await getCollection('blog', ({ data }) => {
    return (
      (includePreview || !data.preview) &&
      (includeDraft || !data.draft) &&
      (!onlyTopic || data.topics?.includes(onlyTopic))
    );
  });

  return blogs
    .slice(0)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
};
