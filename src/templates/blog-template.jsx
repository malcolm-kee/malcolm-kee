import { graphql, Link } from 'gatsby';
import Image from 'gatsby-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import kebabCase from 'lodash/kebabCase';
import React from 'react';
import { isArray } from 'typesafe-is';
import { Comments } from '../components/comments';
import { MainContent } from '../components/main-content';
import { OutLink } from '../components/OutLink';
import { Seo } from '../components/Seo';
import { SubscribeRssLink } from '../components/subscribe-rss-link';
import { ThemeToggle } from '../components/theme-toggle';
import { Ul } from '../components/ul';
import { getReadtimeText } from '../helper';
import styles from './blog-template.module.scss';
import './blog-template.scss';

export default function BlogTemplate({ data, pageContext, location }) {
  const {
    blogPost: {
      title,
      date,
      tags,
      keywords,
      summary,
      lang,
      previewImage: { image, by },
      body,
      timeToRead,
      slug,
    },
    github: {
      search: { nodes: comments },
    },
  } = data;

  return (
    <MainContent as="div">
      <div className="blog-post-container">
        <Seo
          title={title}
          keywords={keywords}
          description={summary}
          image={`/og_image${location.pathname}.png`}
          pathname={location.pathname}
        />
        <main>
          <article className="blog-post px-4" lang={lang}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl leading-loose sm:text-center max-w-lg mx-auto hyphen-auto">
              {title}
            </h1>
            <div className="py-4 flex justify-between items-center">
              <div className="blog-post--date">
                <span>{date}</span>
                {timeToRead && (
                  <>
                    <span>{` • `}</span>
                    <span>{getReadtimeText(timeToRead)} read</span>
                  </>
                )}
              </div>
              <div>
                <ThemeToggle />
              </div>
            </div>
            {image && (
              <>
                <div className={styles.image}>
                  <div>
                    <Image fluid={image.childImageSharp.fluid} alt="" />
                  </div>
                </div>
                {by.name && (
                  <p className={styles.imageAttribution}>
                    <small>
                      Photo by{' '}
                      {by.url ? (
                        <OutLink className={styles.imageAuthor} to={by.url}>
                          {by.name}
                        </OutLink>
                      ) : (
                        by.name
                      )}
                    </small>
                  </p>
                )}
              </>
            )}
            {summary && (
              <div className={styles.summary}>
                <p className={styles.summaryText}>{summary}</p>
              </div>
            )}
            <div
              className={`article-content my-8 relative max-w-lg mx-auto ${styles.content}`}
            >
              <MDXRenderer>{body}</MDXRenderer>
            </div>
          </article>
        </main>
        {tags && tags.length > 0 && (
          <div className="px-4 pt-4 pb-8">
            <span>Tags:</span>
            <span>
              {tags.map((tag, index, list) => (
                <span key={tag}>
                  {' '}
                  <Link to={`/tags/${kebabCase(tag)}`} className="link">
                    {tag}
                  </Link>
                  {index === list.length - 1 ? '' : ','}
                </span>
              ))}
            </span>
          </div>
        )}
        <RelatedBlogs blogs={pageContext.relatedBlogs} />
        <Comments
          comments={comments}
          articlePath={slug}
          searchTerm={pageContext.commentsSearch}
        />
        <AdjacentArticles
          previous={pageContext.previous}
          next={pageContext.next}
        />
        <nav className="Toolbar space-between">
          <Link className="link-primary" to="/blog">
            All Blogs
          </Link>
          <SubscribeRssLink />
        </nav>
      </div>
    </MainContent>
  );
}

function AdjacentArticles({ previous, next }) {
  return (
    <aside aria-label="Newer and Older Blogs">
      <ul className={styles.adjacentArticles}>
        {previous && (
          <li>
            <Link to={previous.slug} rel="prev" data-testid="prevBtn">
              ← {previous.title}
            </Link>
          </li>
        )}
        {next && (
          <li>
            <Link to={next.slug} rel="next" data-testid="nextBtn">
              {next.title} →
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
}

function RelatedBlogs({ blogs }) {
  return isArray(blogs) && blogs.length > 0 ? (
    <aside className={styles.relatedBlogs} aria-label="Related Blogs">
      <p className="mb-2">You may also like:</p>
      <Ul>
        {blogs.map(({ node }) => (
          <li key={node.id}>
            <Link to={node.slug} className="link">
              {node.title}
            </Link>
          </li>
        ))}
      </Ul>
    </aside>
  ) : null;
}

export const pageQuery = graphql`
  query BlogPostById($id: String!, $commentsSearch: String!) {
    blogPost(id: { eq: $id }) {
      body
      slug
      date(formatString: "MMM DD, YYYY")
      title
      tags
      keywords
      summary
      lang
      previewImage {
        image {
          publicURL
          childImageSharp {
            fluid(maxWidth: 1020) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
        by {
          name
          url
        }
      }
      timeToRead
    }
    github {
      search(query: $commentsSearch, type: ISSUE, first: 100) {
        nodes {
          ...Comment
        }
      }
    }
  }
`;
