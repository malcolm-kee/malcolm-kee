import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import { LinkButton } from '../components/Button';
import { ChevronIcon } from '../components/chevron-icon';
import { Comments } from '../components/comments';
import { ReportIssueLink } from '../components/report-issue-link';
import { Seo } from '../components/Seo';
import './instruction-template.scss';

const InstructionTemplate = ({
  data: { mdx, github },
  pageContext: { next, commentsSearch },
  location,
}) => {
  return (
    <div className="instruction-template-container">
      <Seo
        title={`${mdx.frontmatter.title} - ${mdx.workshop.name}`}
        description={mdx.frontmatter.description}
        keywords={mdx.frontmatter.keywords}
        image={mdx.workshop.image.childImageSharp.resize.src}
        icon={mdx.workshop.iconFile.childImageSharp.resize.src}
        pathname={location.pathname}
      />
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
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </article>
        </main>
        {next && (
          <div className="Toolbar right Toolbar--space-vertical">
            <LinkButton to={next.fields.slug} color="bubble" size="large">
              Next Lesson {rightArrow}
            </LinkButton>
          </div>
        )}
        <Comments
          comments={github.search.nodes}
          articlePath={mdx.fields.slug}
          searchTerm={commentsSearch}
        />
      </div>
      <div className="instruction-template-report-issue-container">
        <p>
          Issue on this page?{' '}
          <ReportIssueLink
            title={`Issue on ${mdx.workshop.name}: ${mdx.frontmatter.title}`}
          />
        </p>
      </div>
    </div>
  );
};
const rightArrow = (
  <ChevronIcon
    size={15}
    styles={{
      transform: `rotate(-90deg)`,
      marginLeft: 8,
    }}
  />
);

export default InstructionTemplate;

export const pageQuery = graphql`
  query LessonById($id: String!, $commentsSearch: String!) {
    mdx(id: { eq: $id }) {
      id
      fields {
        slug
      }
      frontmatter {
        title
        description
        section
        keywords
      }
      workshop {
        name
        iconFile {
          childImageSharp {
            resize(width: 16, height: 16) {
              src
            }
          }
        }
        image: iconFile {
          childImageSharp {
            resize(width: 300, height: 157) {
              src
            }
          }
        }
      }
      body
      tableOfContents(maxDepth: 2)
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
