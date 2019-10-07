import React from 'react';
import { MainContent } from '../components/main-content';
import { Seo } from '../components/Seo';
import { List, ListItem, ListItemText } from '../components/List';
import { graphql } from 'gatsby';

const TodayILearnt = ({ data: { allTil }, location }) => {
  return (
    <>
      <Seo title="Today I Learnt" pathname={location.pathname} />
      <MainContent>
        <h1>Today I Learnt</h1>
        {allTil.group.map(({ topic, nodes }) => (
          <div key={topic}>
            <h2>{topic}</h2>
            <List>
              {nodes.map(til => (
                <ListItem link={til.slug} key={til.slug}>
                  <ListItemText
                    primaryText={til.title}
                    secondaryText={til.date}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        ))}
      </MainContent>
    </>
  );
};

export default TodayILearnt;

export const pageQuery = graphql`
  query {
    allTil {
      group(field: topics) {
        topic: fieldValue
        nodes {
          slug
          title
          date(formatString: "MMM DD, YYYY")
        }
      }
    }
  }
`;
