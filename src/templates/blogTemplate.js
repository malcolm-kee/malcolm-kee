import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import kebabCase from 'lodash/kebabCase';
import { Icon } from '../components/Icon';
import { Button } from '../components/Button';
import './blogTemplate.scss';

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark;
  return (
    <div className="blog-post-container">
      <Helmet title={`${frontmatter.title} - Malcolm Kee's blog`} />
      <article className="blog-post">
        <h1>{frontmatter.title}</h1>
        <div className="blog-post--detail-container">
          <div className="blog-post--date">
            <Icon>today</Icon>
            <span>{frontmatter.date}</span>
          </div>
          {frontmatter.tags && frontmatter.tags.length > 0 ? (
            <div className="blog-post--tag">
              <Icon>local_offer</Icon>
              <span>
                {frontmatter.tags.map((tag, index, list) => (
                  <span>
                    {' '}
                    <Link to={`/tags/${kebabCase(tag)}`}>{tag}</Link>
                    {index === list.length - 1 ? '' : ','}
                  </span>
                ))}
              </span>
            </div>
          ) : null}
        </div>
        <div
          className="blog-post--content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
      <div className="Toolbar">
        <Button color="primary" component={Link} to="/blog" raised>
          <Icon>arrow_back</Icon>
        </Button>
      </div>
    </div>
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
      }
    }
  }
`;
