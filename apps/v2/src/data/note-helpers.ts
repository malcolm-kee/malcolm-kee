import { getCollection } from 'astro:content';
import type { Topic } from './topic-types';

export const getNotes = async ({
  includePreview = false,
  topics,
}: {
  includePreview?: boolean;
  topics?: Array<Topic>;
} = {}) => {
  const notes = await getCollection(
    'note',
    ({ data }) =>
      (includePreview || !data.preview) &&
      (!topics || topics.some((topic) => data.topics?.includes(topic)))
  );

  return notes;
};
