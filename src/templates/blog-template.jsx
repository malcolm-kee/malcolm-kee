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
import { getReadtimeText } from '../helper';
import styles from './blog-template.module.scss';
import './blog-template.scss';
import { Ul } from '../components/ul';

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
          <article className="blog-post" lang={lang}>
            <h1 className="blog-post--title">{title}</h1>
            <div className="blog-post--detail-container">
              <div className="blog-post--date">
                <span>{date}</span>
                {timeToRead && (
                  <>
                    <span>{` • `}</span>
                    <span>{getReadtimeText(timeToRead)} read</span>
                  </>
                )}
              </div>
              <div className="blog-post--actions">
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
              <div className="blog-post--summary">
                <p>{summary}</p>
              </div>
            )}
            <div className="blog-post--content article-content">
              <MDXRenderer>{body}</MDXRenderer>
            </div>
          </article>
        </main>
        {tags && tags.length > 0 && (
          <div className="blog-post--tag">
            <span>Tags:</span>
            <span>
              {tags.map((tag, index, list) => (
                <span key={tag}>
                  {' '}
                  <Link to={`/tags/${kebabCase(tag)}`}>{tag}</Link>
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
      <p>You may also like:</p>
      <Ul>
        {blogs.map(({ node }) => (
          <li key={node.id}>
            <Link to={node.slug}>{node.title}</Link>
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
