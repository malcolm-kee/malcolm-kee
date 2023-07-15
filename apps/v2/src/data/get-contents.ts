import { getBlogs } from './blog-helpers';
import { getNotes } from './note-helpers';
import { getTils } from './til-helpers';

export async function getContents(): Promise<
  Array<{
    title: string;
    pubDate: Date;
    updatedDate?: Date;
    url: string;
    description?: string;
    image?: string;
  }>
> {
  const [blogs, notes, tils] = await Promise.all([getBlogs(), getNotes(), getTils()]);

  return [
    ...blogs.map((d) => ({
      title: d.data.title,
      pubDate: d.data.pubDate,
      updatedDate: d.data.updatedDate,
      description: d.data.description,
      url: `/blog/${d.slug}/`,
      image: d.heroImageInfo && d.heroImageInfo.baseSrc,
    })),
    ...notes.map((d) => ({
      title: d.data.title,
      pubDate: d.data.pubDate,
      updatedDate: d.data.updatedDate,
      description: d.data.description,
      url: `/note/${d.slug}/`,
    })),
    ...tils.map((d) => ({
      title: d.data.title,
      pubDate: d.data.pubDate,
      updatedDate: d.data.updatedDate,
      url: `/today-i-learnt/${d.slug}/`,
    })),
  ];
}
