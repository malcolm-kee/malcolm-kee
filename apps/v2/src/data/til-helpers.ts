import { getCollection } from 'astro:content';
import { groupArrayBy } from '~/lib/array';
import type { Topic } from './topic-helpers';

export const getTils = async ({
  includePreview = false,
  onlyTopic,
}: { includePreview?: boolean; onlyTopic?: Topic } = {}) => {
  const tils = await getCollection(
    'today-i-learnt',
    ({ data }) =>
      (includePreview || !data.preview) &&
      (!onlyTopic || data.topics.includes(onlyTopic))
  );

  return tils
    .slice(0)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
};

export const getTilByTopic = async (options?: { includePreview?: boolean }) => {
  const tils = await getTils(options);

  return groupArrayBy(tils, (item) => item.data.topics);
};
