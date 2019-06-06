import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import React from 'react';
import { Helmet } from 'react-helmet';
import { LinkButton } from '../components/Button';
import { Comments } from '../components/comments';
import './instruction-template.scss';

const InstructionTemplate = ({
  data: { mdx, github },
  pageContext: { next }
}) => (
  <div className="instruction-template-container">
    <Helmet>
      <title>{mdx.frontmatter.title}</title>
      {mdx.frontmatter.description && (
        <meta name="description" content={mdx.frontmatter.description} />
      )}
    </Helmet>
    <div className="instruction-template">
      <h1>{mdx.frontmatter.title}</h1>
      <div className="instruction-toc">
        {mdx.tableOfContents.items && (
          <ul>
            {mdx.tableOfContents.items.map(item => (
              <li key={item.url}>
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <main>
        <article className="instruction-article article-content">
          <MDXRenderer>{mdx.code.body}</MDXRenderer>
        </article>
      </main>
      <Comments
        comments={github.search.nodes}
        articlePath={mdx.frontmatter.path}
      />
      {next && (
        <div className="Toolbar right">
          <LinkButton to={next.frontmatter.path} color="bubble" large>
            Next Lesson
          </LinkButton>
        </div>
      )}
    </div>
  </div>
);

export default InstructionTemplate;

export const pageQuery = graphql`
  query LessonById($id: String!, $commentsSearch: String!) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
        description
        section
        path
      }
      code {
        body
      }
      tableOfContents(maxDepth: 2)
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
