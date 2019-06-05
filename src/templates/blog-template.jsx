import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import React from 'react';
import Helmet from 'react-helmet';
import { Comments } from '../components/comments';
import { MainContent } from '../components/main-content';
import { OutLink } from '../components/OutLink';
import { RssIcon } from '../components/rss-icon';
import { ThemeToggle } from '../components/theme-toggle';
import { getReadtimeText } from '../helper';
import './blog-template.scss';

function AdjacentArticles({ previous, next }) {
  return (
    <aside>
      <ul className="blog-post-adjacent-articles">
        {previous && (
          <li>
            <Link to={previous.frontmatter.path} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          </li>
        )}
        {next && (
          <li>
            <Link to={next.frontmatter.path} rel="next">
              {next.frontmatter.title} →
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
}

export default function Template({ data, pageContext }) {
  const {
    markdownRemark: {
      frontmatter: { title, date, tags, keywords, summary, path },
      html,
      timeToRead
    },
    github: {
      search: { nodes: comments }
    }
  } = data;

  const hasSummary = !!summary && summary.length > 0;

  return (
    <MainContent as="div">
      <div className="blog-post-container">
        <Helmet>
          <title>{title} - Malcolm Kee's blog</title>
          <meta property="og:title" content={title} />
          <meta name="twitter:title" content={title} />
          {keywords &&
            keywords.length > 0 && (
              <meta name="keywords" content={keywords.join(',')} />
            )}
          {hasSummary && <meta name="abstract" content={summary} />}
          {hasSummary && <meta property="og:description" content={summary} />}
          {hasSummary && <meta name="twitter:description" content={summary} />}
        </Helmet>
        <main>
          <article className="blog-post">
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
            {summary && (
              <div className="blog-post--summary">
                <p>{summary}</p>
              </div>
            )}
            <div
              className="blog-post--content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </article>
        </main>
        {tags &&
          tags.length > 0 && (
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
        <Comments comments={comments} articlePath={path} />
        <AdjacentArticles
          previous={pageContext.previous}
          next={pageContext.next}
        />
        <nav className="Toolbar space-between">
          <Link className="link-primary" to="/blog">
            All Blogs
          </Link>
          <OutLink href="/rss.xml">
            <RssIcon />
          </OutLink>
        </nav>
      </div>
    </MainContent>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!, $commentsSearch: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMM DD, YYYY")
        path
        title
        tags
        keywords
        summary
      }
      timeToRead
    }
    github {
      search(query: $commentsSearch, type: ISSUE, first: 100) {
        nodes {
          ... on GitHub_Issue {
            id
            url
            bodyHTML
            createdAt
            author {
              ... on GitHub_User {
                name
              }
              avatarUrl
              url
            }
            comments(first: 100) {
              nodes {
                id
                bodyHTML
                createdAt
                author {
                  ... on GitHub_User {
                    name
                  }
                  avatarUrl
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;
