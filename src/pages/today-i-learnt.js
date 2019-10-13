import { graphql, Link } from 'gatsby';
import React from 'react';
import { MainContent } from '../components/main-content';
import { OutLink } from '../components/OutLink';
import { PageTitleContainer } from '../components/page-title-container';
import { Seo } from '../components/Seo';
import { TopicBadge } from '../components/topic-badge';
import styles from './today-i-learnt.module.scss';

const TodayILearnt = ({ data: { allTil, allTopics }, location }) => {
  return (
    <>
      <Seo
        title="Today I Learnt - Malcolm Kee"
        description="Little facts I learnts in my daily life as a Frontend Engineer"
        pathname={location.pathname}
      />
      <MainContent>
        <PageTitleContainer title="Today I Learnt" />
        <p className={styles.description}>
          Inspired by{' '}
          <OutLink to="https://www.stefanjudis.com/today-i-learned/">
            Stefan Judis
          </OutLink>
          , these are the little facts I learnt in my daily life as a Frontend
          Engineer.
        </p>
        <div className={styles.grid}>
          {allTopics.nodes.map(topic => {
            const nodes =
              allTil.group
                .filter(til => til.topic === topic.id)
                .map(til => til.nodes)[0] || [];

            return (
              <div key={topic.id}>
                <h2>
                  <TopicBadge {...topic} />
                </h2>
                <ul className={styles.list}>
                  {nodes.map(til => (
                    <li className={styles.item} key={til.slug}>
                      <Link className="til-item" to={til.slug}>
                        {til.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </MainContent>
    </>
  );
};

export default TodayILearnt;

export const pageQuery = graphql`
  query {
    allTil(sort: { fields: date, order: DESC }) {
      group(field: topics___id) {
        topic: fieldValue
        nodes {
          slug
          title
          date(formatString: "MMM DD, YYYY")
        }
      }
    }
    allTopics: allTopicsYaml {
      nodes {
        id
        icon {
          publicURL
        }
      }
    }
  }
`;
