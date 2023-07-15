import { getCollection, type CollectionEntry } from 'astro:content';
import { getTransformedImage, type ImageData } from '~/lib/cloudinary';
import type { Topic } from './topic-types';

export const getBlogs = async ({
  includePreview = false,
  includeDraft = false,
  topics,
}: {
  includePreview?: boolean;
  includeDraft?: boolean;
  topics?: Array<Topic>;
} = {}): Promise<
  Array<CollectionEntry<'blog'> & { isMarkdown: boolean; heroImageInfo?: ImageData }>
> => {
  const blogs = await getCollection('blog', ({ data }) => {
    return (
      (includePreview || !data.preview) &&
      (includeDraft || !data.draft) &&
      (!topics || topics.some((topic) => data.topics?.includes(topic)))
    );
  });

  const allBlogData = await Promise.all(
    blogs.map(async (blog) => {
      const isMarkdown = blog.id.endsWith('.md');

      return blog.data.heroImagePublicId
        ? {
            ...blog,
            heroImageInfo: await getTransformedImage(blog.data.heroImagePublicId),
            isMarkdown,
          }
        : {
            ...blog,
            isMarkdown,
          };
    })
  );

  return allBlogData.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
};
