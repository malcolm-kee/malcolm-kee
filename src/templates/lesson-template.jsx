import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import { LinkButton } from '../components/Button';
import { ChevronIcon } from '../components/chevron-icon';
import { Comments } from '../components/comments';
import { ErrorBoundary } from '../components/error-boundary';
import { ReportIssueLink } from '../components/report-issue-link';
import { Seo } from '../components/Seo';
import './lesson-template.scss';
import styles from './lesson-template.module.scss';

const LessonTemplate = ({
  data: { lesson, github },
  pageContext: { next, commentsSearch },
  location,
}) => {
  return (
    <ErrorBoundary>
      <div className="instruction-template-container">
        <Seo
          title={`${lesson.title} - ${lesson.workshop.name}`}
          description={lesson.description}
          keywords={lesson.keywords}
          image={`/og_image${location.pathname}.png`}
          icon={lesson.workshop.iconFile.childImageSharp.resize.src}
          pathname={location.pathname}
        />
        <div className="instruction-template">
          <h1 className={styles.skipLinkContainer}>
            <a
              href="#workshop-toc"
              id="skip-main"
              aria-label="Skip to table of content"
              className={styles.routeSkipLink}
            >
              <ChevronIcon
                size={15}
                styles={{ transform: `rotate(-90deg)` }}
                aria-hidden
              />
            </a>
            {lesson.title}
          </h1>
          <div className="instruction-toc">
            {lesson.tableOfContents.items && (
              <ul>
                {lesson.tableOfContents.items.map(item => (
                  <li key={item.url}>
                    <a href={item.url}>{item.title}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <main>
            <article className="instruction-article article-content">
              <MDXRenderer>{lesson.body}</MDXRenderer>
            </article>
          </main>
          {next && (
            <div className="Toolbar right Toolbar--space-vertical">
              <LinkButton to={next.slug} color="primary" raised>
                Next Lesson {rightArrow}
              </LinkButton>
            </div>
          )}
          <Comments
            comments={github.search.nodes}
            articlePath={lesson.slug}
            searchTerm={commentsSearch}
          />
        </div>
        <div className="instruction-template-report-issue-container">
          <p>
            Issue on this page?{' '}
            <ReportIssueLink
              title={`Issue on ${lesson.workshop.name}: ${lesson.title}`}
            />
          </p>
        </div>
      </div>
    </ErrorBoundary>
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

export default LessonTemplate;

export const pageQuery = graphql`
  query LessonBySlug($slug: String!, $commentsSearch: String!) {
    lesson(slug: { eq: $slug }) {
      id
      slug
      title
      description
      section
      keywords
      workshop {
        name
        iconFile {
          childImageSharp {
            resize(width: 16, height: 16) {
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
