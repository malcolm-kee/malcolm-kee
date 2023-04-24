import rss from '@astrojs/rss';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';
import { getBlogs } from '~/data/blog-helpers';
import { getTils } from '~/data/til-helpers';

const parser = new MarkdownIt();

export async function get(context) {
  const blogs = await getBlogs();
  const tils = await getTils();

  /**
   * @type {import('@astrojs/rss').RSSOptions['items']}
   */
  const allItems = blogs
    .map((post) => ({
      link: `/blog/${post.slug}/`,
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      customData: `<language>${post.data.lang || 'en-US'}</language>`,
      ...(post.isMarkdown
        ? {
            content: sanitizeHtml(parser.render(post.body)),
          }
        : {}),
    }))
    .concat(
      tils.map((post) => ({
        link: `/today-i-learnt/${post.slug}/`,
        title: post.data.title,
        pubDate: post.data.pubDate,
        customData: `<language>en-US</language>`,
        ...(post.isMarkdown
          ? {
              content: sanitizeHtml(parser.render(post.body)),
            }
          : {}),
      }))
    )
    .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: 'Malcolm Kee',
    description: 'Web developer, front end engineer',
    site: context.site,
    items: allItems,
    stylesheet: '/rss/styles.xsl',
  });
}
