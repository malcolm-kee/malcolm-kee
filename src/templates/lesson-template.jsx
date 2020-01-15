import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import { LinkButton } from '../components/Button';
import { ChevronIcon } from '../components/chevron-icon';
import { Comments } from '../components/comments';
import { ErrorBoundary } from '../components/error-boundary';
import { ReportIssueLink } from '../components/report-issue-link';
import { Seo } from '../components/Seo';
import { useObserver } from '../hooks/use-observer';
import styles from './lesson-template.module.scss';
import './lesson-template.scss';

const LessonTemplate = ({
  data: { lesson, github },
  pageContext: { next, commentsSearch },
  location,
}) => {
  const headings = React.useMemo(
    () =>
      lesson.tableOfContents.items
        ? lesson.tableOfContents.items.map(item => item.url)
        : [],
    [lesson.tableOfContents.items]
  );

  const visibleIds = useObserver(headings, {
    rootMargin: `0px 0px -60% 0px`,
  });
  const achievedHeadingIndex = React.useMemo(() => {
    let achievedIndex = -1;
    headings.forEach((heading, index) => {
      if (visibleIds.includes(heading)) {
        achievedIndex = index;
      }
    });
    return achievedIndex;
  }, [visibleIds, headings]);

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
          <h1 className="relative text-5xl my-6 text-gray-700 dark:text-gray-300">
            <a
              href="#workshop-toc"
              id="skip-main"
              aria-label="Skip to table of content"
              className={styles.routeSkipLink}
            >
              <ChevronIcon
                size={15}
                styles={{ transform: `rotate(90deg)` }}
                aria-hidden
              />
            </a>
            {lesson.title}
          </h1>
          {lesson.objectives && (
            <div className="my-4 py-2 px-4 border-l-4 border-primary-700 bg-primary-200 text-gray-900">
              <p className="font-semibold text-xl">What you'll learn</p>
              <ul className="list-disc pl-4 leading-loose">
                {lesson.objectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="instruction-toc py-4">
            {lesson.tableOfContents.items && (
              <ul>
                {lesson.tableOfContents.items.map((item, index) => (
                  <li
                    className={
                      index <= achievedHeadingIndex
                        ? styles.activeLink
                        : styles.link
                    }
                    key={item.url}
                  >
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
            <div className="text-right p-2 my-4">
              <LinkButton
                to={next.slug}
                color="primary"
                className="text-2xl px-4"
                raised
              >
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
      objectives
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
