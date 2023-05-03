import type { CollectionEntry } from 'astro:content';
import { pickRandomItems } from '~/lib/array';
import { getBlogs } from './blog-helpers';
import { getTils } from './til-helpers';

export interface RelatedContents {
  blogs: Array<CollectionEntry<'blog'>>;
  tils: Array<CollectionEntry<'today-i-learnt'>>;
}

export const getBlogRelatedContents = async (
  blogPost: CollectionEntry<'blog'>,
  totalCount = 3
): Promise<RelatedContents> => {
  if (blogPost.data.topics) {
    const relatedBlogs = (await getBlogs({ topics: blogPost.data.topics })).filter(
      (blog) => blog.id !== blogPost.id
    );
    if (relatedBlogs.length >= totalCount) {
      const preferredBlogs = relatedBlogs.filter((blog) => blog.data.lang === blogPost.data.lang);

      if (preferredBlogs.length) {
        if (preferredBlogs.length >= totalCount) {
          return {
            blogs: pickRandomItems(preferredBlogs, totalCount),
            tils: [],
          };
        } else {
          const otherBlogs: Array<CollectionEntry<'blog'>> = pickRandomItems(
            relatedBlogs.filter(
              (blog) => !preferredBlogs.some((preferredBlog) => preferredBlog.id === blog.id)
            ),
            totalCount - preferredBlogs.length
          );

          return {
            blogs: pickRandomItems([...preferredBlogs, ...otherBlogs], totalCount),
            tils: [],
          };
        }
      }

      return {
        blogs: pickRandomItems(relatedBlogs, totalCount),
        tils: [],
      };
    }

    const tils = await getTils({ topics: blogPost.data.topics });

    if (tils.length >= totalCount - relatedBlogs.length) {
      return {
        blogs: relatedBlogs,
        tils: pickRandomItems(tils, totalCount - relatedBlogs.length),
      };
    }

    const anyOtherBlogs = (await getBlogs()).filter(
      (blog) =>
        blog.id !== blogPost.id && relatedBlogs.every((relatedBlog) => relatedBlog.id !== blog.id)
    );

    return {
      blogs: relatedBlogs.concat(
        pickRandomItems(anyOtherBlogs, totalCount - relatedBlogs.length - tils.length)
      ),
      tils,
    };
  }

  const blogs = (await getBlogs()).filter((blog) => blog.id !== blogPost.id);

  return {
    blogs: pickRandomItems(blogs, totalCount),
    tils: [],
  };
};

export const getTilRelatedContents = async (
  til: CollectionEntry<'today-i-learnt'>,
  totalCount = 3
): Promise<RelatedContents> => {
  if (til.data.topics) {
    const relatedTils = (await getTils({ topics: til.data.topics })).filter(
      (item) => item.id !== til.id
    );

    if (relatedTils.length >= totalCount) {
      return {
        tils: pickRandomItems(relatedTils, totalCount),
        blogs: [],
      };
    }

    const blogs = await getBlogs({ topics: til.data.topics });

    if (blogs.length >= totalCount - relatedTils.length) {
      return {
        tils: relatedTils,
        blogs: pickRandomItems(blogs, totalCount - relatedTils.length),
      };
    }

    const anyOtherTils = (await getTils()).filter(
      (item) => item.id !== til.id && relatedTils.every((relatedTil) => relatedTil.id !== item.id)
    );

    return {
      tils: relatedTils.concat(
        pickRandomItems(anyOtherTils, totalCount - relatedTils.length - blogs.length)
      ),
      blogs,
    };
  }

  const tils = (await getTils()).filter((item) => item.id !== til.id);

  return {
    tils: pickRandomItems(tils, totalCount),
    blogs: [],
  };
};
