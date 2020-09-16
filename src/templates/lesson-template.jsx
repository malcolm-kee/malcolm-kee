import { graphql } from 'gatsby';
import { useIsJsEnabled } from 'gatsby-plugin-js-fallback';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import * as React from 'react';
import { LinkButton } from '../components/Button';
import { ChevronIcon } from '../components/chevron-icon';
import { ErrorBoundary } from '../components/error-boundary';
import { FriendlyComments } from '../components/friendly-comments';
import { ReportIssueLink } from '../components/report-issue-link';
import { Seo } from '../components/Seo';
import { ShareButton } from '../components/share-button';
import { useLayout } from '../layouts/layout-context';
import { removeTrailingSlash } from '../lib/util';
import styles from './lesson-template.module.scss';
import './lesson-template.scss';

const LessonTemplate = ({
  data: { lesson },
  pageContext: { next, commentsSearch },
  location,
}) => {
  const isJsEnabled = useIsJsEnabled();
  useLayout('workshop');

  return (
    <ErrorBoundary>
      <div className="instruction-template-container">
        <Seo
          title={`${lesson.title} - ${lesson.workshop.name}`}
          description={lesson.description}
          keywords={lesson.keywords}
          image={`/og_image${removeTrailingSlash(location.pathname)}.png`}
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
          <div className="pb-4 text-right">
            <ShareButton
              details={{
                title: `${lesson.workshop.name} - ${lesson.title}`,
                url: location.href,
                text: lesson.description || lesson.title,
              }}
            >
              Share this lesson
            </ShareButton>
          </div>
          {lesson.objectives && (
            <div className="my-4 py-2 px-4 border-l-4 border-primary-700 bg-primary-200 text-gray-900 dark:bg-primary-800 dark:text-gray-200 dark:border-primary-200">
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
              <ul className={styles.tocPlain}>
                {lesson.tableOfContents.items.map((item, i) => (
                  <li className="mb-1 lg:mb-5" key={i}>
                    <a
                      href={item.url}
                      className="block px-4 py-2 text-sm leading-6"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <main>
            <article className="instruction-article article-content pb-8">
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
          {isJsEnabled && (
            <FriendlyComments
              identifier={lesson.id}
              title={lesson.title}
              url={lesson.slug}
            />
          )}
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
  query LessonBySlug($slug: String) {
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
  }
`;
