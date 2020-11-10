import { graphql, Link } from 'gatsby';
import * as React from 'react';
import { MainContent } from '../components/main-content';
import { OutLink } from '../components/OutLink';
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
        <div className="text-center my-6">
          <h1 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            Today I Learnt
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
            Inspired by{' '}
            <OutLink
              className="hover:underline"
              to="https://www.stefanjudis.com/today-i-learned/"
            >
              Stefan Judis
            </OutLink>
            , these are the little facts I learnt in my daily life as a Frontend
            Engineer.
          </p>
        </div>
        <div className={styles.grid}>
          {allTopics.nodes.map((topic) => {
            const nodes =
              allTil.group
                .filter((til) => til.topic === topic.id)
                .map((til) => til.nodes)[0] || [];

            return (
              <div key={topic.id}>
                <h2 className="my-4">
                  <TopicBadge {...topic} />
                </h2>
                <ul className={styles.list}>
                  {nodes.map((til) => (
                    <li className={styles.item} key={til.slug}>
                      <Link className="til-item hover:underline" to={til.slug}>
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
    allTopics: allTopicsYaml(sort: { fields: id }) {
      nodes {
        id
        icon {
          publicURL
        }
      }
    }
  }
`;
