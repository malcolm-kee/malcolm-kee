import { getCollection } from 'astro:content';
import { groupArrayBy } from '~/lib/array';

export const getTils = async ({ includePreview = false } = {}) => {
  const tils = await getCollection(
    'today-i-learnt',
    ({ data }) => includePreview || !data.preview
  );

  return tils
    .slice(0)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
};

export const getTilByTopic = async (options?: { includePreview?: boolean }) => {
  const tils = await getTils(options);

  return groupArrayBy(tils, (item) => item.data.topics);
};
