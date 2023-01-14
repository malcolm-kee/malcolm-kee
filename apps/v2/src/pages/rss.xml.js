import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';

const allMdxList = import.meta.glob('./blog/**/*.mdx', { eager: true });
const allMdList = import.meta.glob('./blog/**/*.md', { eager: true });

const posts = Object.values(allMdxList)
  .map((post) => ({
    ...post,
    isMdx: true,
  }))
  .concat(Object.values(allMdList))
  .filter((post) => !post.frontmatter.preview)
  .sort(
    (a, b) =>
      new Date(b.frontmatter.pubDate).valueOf() -
      new Date(a.frontmatter.pubDate).valueOf()
  );

export const get = () => {
  return rss({
    title: 'Malcolm Kee',
    description: 'Web developer, front end engineer',
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
      link: post.url,
      title: post.frontmatter.title,
      pubDate: post.frontmatter.pubDate,
      description: post.frontmatter.description,
      content: post.isMdx ? undefined : sanitizeHtml(post.compiledContent()),
      customData: `<language>${post.frontmatter.lang || 'en-US'}</language>`,
    })),
    stylesheet: '/rss/styles.xsl',
  });
};
