import { getCollection } from 'astro:content';

export const getBlogs = async ({
  includePreview = false,
  includeDraft = false,
} = {}) => {
  const blogs = await getCollection('blog', ({ data }) => {
    return (includePreview || !data.preview) && (includeDraft || !data.draft);
  });

  return blogs
    .slice(0)
    .sort(
      (a, b) =>
        new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf()
    );
};
