import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import { isArray } from 'typesafe-is';
import { MainContent } from '../components/main-content';
import { Seo } from '../components/Seo';
import { TopicBadge } from '../components/topic-badge';
import { ChevronIcon } from '../components/chevron-icon';
import styles from './til-template.module.scss';

const TilTemplate = ({ data, location }) => {
  const { til } = data;

  return (
    <>
      <Seo title={til.title} pathname={location.pathname} />
      <MainContent>
        <div className={styles.container}>
          <article className={`article-content ${styles.content}`}>
            <h1 className={styles.title}>{til.title}</h1>
            <MDXRenderer>{til.body}</MDXRenderer>
            {isArray(til.topics) && til.topics.length > 0 && (
              <div>
                <h2>Topics</h2>
                <ul className={styles.list}>
                  {til.topics.map(topic => (
                    <li className={styles.item} key={topic.id}>
                      <TopicBadge {...topic} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
          <nav className="Toolbar space-between">
            <Link to="/today-i-learnt">
              <ChevronIcon
                aria-hidden
                style={{
                  transform: `rotate(90deg)`,
                  marginRight: 8,
                }}
              />{' '}
              All Notes
            </Link>
          </nav>
        </div>
      </MainContent>
    </>
  );
};

export default TilTemplate;

export const pageQuery = graphql`
  query TilById($id: String!) {
    til(id: { eq: $id }) {
      title
      body
      topics {
        id
        icon {
          publicURL
        }
      }
    }
  }
`;