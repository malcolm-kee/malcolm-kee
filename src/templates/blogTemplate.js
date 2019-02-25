import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import React from 'react';
import Helmet from 'react-helmet';
import { Button } from '../components/Button';
import { getReadtimeText } from '../helper';
import './blogTemplate.scss';

function AdjacentArticles({ previous, next }) {
  return (
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
  );
}

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
  pageContext,
}) {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const {
    frontmatter: { title, date, tags, keywords, summary },
    html,
    timeToRead,
  } = markdownRemark;
  return (
    <div className="main-content">
      <div className="blog-post-container">
        <Helmet>
          <title>{title} - Malcolm Kee's blog</title>
          {keywords &&
            keywords.length > 0 && (
              <meta name="keywords" content={keywords.join(',')} />
            )}
          {summary &&
            summary.length > 0 && <meta name="abstract" content={summary} />}
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
              {tags && tags.length > 0 ? (
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
              ) : null}
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
        <AdjacentArticles
          previous={pageContext.previous}
          next={pageContext.next}
        />
        <nav className="Toolbar">
          <Button
            color="primary"
            component={Link}
            to="/blog"
            aria-label="all blogs"
            title="all blogs"
            raised
          >
            All Blogs
          </Button>
        </nav>
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
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
  }
`;
