import { graphql, Link } from 'gatsby';
import Image from 'gatsby-image';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import kebabCase from 'lodash/kebabCase';
import React from 'react';
import { Comments } from '../components/comments';
import { MainContent } from '../components/main-content';
import { Seo } from '../components/Seo';
import { SubscribeRssLink } from '../components/subscribe-rss-link';
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

export default function BlogTemplate({ data, pageContext }) {
  const {
    mdx: {
      frontmatter: { title, date, tags, keywords, summary, path, lang, image },
      code,
      timeToRead,
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
          image={image && image.publicURL}
        />
        <main>
          <article className="blog-post" lang={lang ? lang : undefined}>
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
            {image && <Image fluid={image.childImageSharp.fluid} alt="" />}
            {summary && (
              <div className="blog-post--summary">
                <p>{summary}</p>
              </div>
            )}
            <div className="blog-post--content article-content">
              <MDXRenderer>{code.body}</MDXRenderer>
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
        <Comments
          comments={comments}
          articlePath={path}
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

export const pageQuery = graphql`
  query BlogPostByPath($id: String!, $commentsSearch: String!) {
    mdx(id: { eq: $id }) {
      code {
        body
      }
      frontmatter {
        date(formatString: "MMM DD, YYYY")
        path
        title
        tags
        keywords
        summary
        lang
        image {
          publicURL
          childImageSharp {
            fluid(maxWidth: 1020) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
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
