import rss from '@astrojs/rss';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';
import { getBlogs } from '~/data/blog-helpers';

const parser = new MarkdownIt();

export async function get() {
  const blogs = await getBlogs();

  return rss({
    title: 'Malcolm Kee',
    description: 'Web developer, front end engineer',
    site: import.meta.env.SITE,
    items: blogs.map((post) => ({
      link: `/blog/${post.slug}/`,
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      content: sanitizeHtml(parser.render(post.body)),
      customData: `<language>${post.data.lang || 'en-US'}</language>`,
    })),
    stylesheet: '/rss/styles.xsl',
  });
}
