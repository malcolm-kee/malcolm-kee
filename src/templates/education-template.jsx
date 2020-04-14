import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import { LinkButton } from '../components/Button';
import { ChevronIcon } from '../components/chevron-icon';
import { ErrorBoundary } from '../components/error-boundary';
import { ScrollProgress } from '../components/scroll-progress';
import { Seo } from '../components/Seo';
import { ShareButton } from '../components/share-button';
import styles from './lesson-template.module.scss';
import './lesson-template.scss';

const EducationTemplate = ({
  data: { education },
  pageContext: { next },
  location,
}) => {
  return (
    <ErrorBoundary>
      <div className="instruction-template-container">
        <Seo
          title={`${education.chapter} - ${education.title}`}
          description={education.description}
          keywords={education.keywords}
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
            {education.title}
          </h1>
          <div className="pb-4 text-right">
            <ShareButton
              details={{
                title: `${education.chapter} - ${education.title}`,
                url: location.href,
                text: education.description || education.title,
              }}
            >
              Share this lesson
            </ShareButton>
          </div>
          {education.objectives && (
            <div className="my-4 py-2 px-4 border-l-4 border-primary-700 bg-primary-200 text-gray-900 dark:bg-primary-800 dark:text-gray-200 dark:border-primary-200">
              <p className="font-semibold text-xl">What you'll learn</p>
              <ul className="list-disc pl-4 leading-loose">
                {education.objectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="instruction-toc py-4">
            {education.tableOfContents.items && (
              <>
                <ScrollProgress
                  items={education.tableOfContents.items}
                  className={styles.progressWrapper}
                />
                <ul className={styles.tocPlain}>
                  {education.tableOfContents.items.map((item, i) => (
                    <li key={i}>
                      <a href={item.url}>{item.title}</a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <main>
            <article className="instruction-article article-content pb-4">
              <MDXRenderer>{education.body}</MDXRenderer>
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

export default EducationTemplate;

export const pageQuery = graphql`
  query EducationBySlug($slug: String!) {
    education(slug: { eq: $slug }) {
      id
      slug
      title
      description
      subject {
        name
      }
      chapter
      objectives
      body
      tableOfContents(maxDepth: 2)
    }
  }
`;
