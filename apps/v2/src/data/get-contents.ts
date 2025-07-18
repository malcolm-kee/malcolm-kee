import { getBlogs } from './blog-helpers';
import { getNotes } from './note-helpers';
import { getTils } from './til-helpers';

export type ContentData = {
  id: string;
  type: 'note' | 'blog' | 'til';
  title: string;
  pubDate: Date;
  lang: string;
  updatedDate?: Date;
  url: string;
  description?: string;
  image?: string;
};

export async function getContents(): Promise<Array<ContentData>> {
  const [blogs, notes, tils] = await Promise.all([getBlogs(), getNotes(), getTils()]);

  return [
    ...blogs.map(
      (d): ContentData => ({
        title: d.data.title,
        pubDate: d.data.pubDate,
        updatedDate: d.data.updatedDate,
        description: d.data.description,
        lang: d.data.lang || 'en-US',
        url: `/blog/${d.id}/`,
        image: d.heroImageInfo && d.heroImageInfo.baseSrc,
        type: 'blog',
        id: d.id,
      })
    ),
    ...notes.map(
      (d): ContentData => ({
        title: d.data.title,
        pubDate: d.data.pubDate,
        updatedDate: d.data.updatedDate,
        description: d.data.description,
        lang: 'en-US',
        url: `/note/${d.id}/`,
        type: 'note',
        id: d.id,
      })
    ),
    ...tils.map(
      (d): ContentData => ({
        title: d.data.title,
        pubDate: d.data.pubDate,
        updatedDate: d.data.updatedDate,
        lang: 'en-US',
        url: `/today-i-learnt/${d.id}/`,
        type: 'til',
        id: d.id,
      })
    ),
  ];
}
