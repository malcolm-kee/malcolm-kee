import { getCollection } from 'astro:content';
import { groupArrayBy } from '~/lib/array';
import type { Topic } from './topic-types';

export const getTils = async ({
  includePreview = false,
  topics,
}: { includePreview?: boolean; topics?: Array<Topic> } = {}) => {
  const tils = await getCollection(
    'today-i-learnt',
    ({ data }) =>
      (includePreview || !data.preview) &&
      (!topics || data.topics.some((topic) => topics.includes(topic)))
  );

  return tils
    .slice(0)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
};

export const getTilByTopic = async (options?: { includePreview?: boolean }) => {
  const tils = await getTils(options);

  return groupArrayBy(tils, (item) => item.data.topics);
};
