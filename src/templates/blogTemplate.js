import { graphql } from 'gatsby';
import React from 'react';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';
import kebabCase from 'lodash/kebabCase';
import { Icon } from '../components/Icon';
import { Button } from '../components/Button';
import { Layout } from '../components/Layout';
import './blogTemplate.scss';

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const {
    frontmatter: { title, date, tags, keywords, summary },
    html,
  } = markdownRemark;
  return (
    <Layout>
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
                  <Icon>today</Icon>
                  <span>{date}</span>
                </div>
                {tags && tags.length > 0 ? (
                  <div className="blog-post--tag">
                    <Icon>local_offer</Icon>
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
          <nav className="Toolbar">
            <Button
              color="primary"
              component={Link}
              to="/blog"
              aria-label="all blogs"
              title="all blogs"
              raised
            >
              <Icon>arrow_back</Icon>
            </Button>
          </nav>
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        tags
        keywords
        summary
      }
    }
  }
`;
