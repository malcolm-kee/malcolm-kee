import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import { List, ListItem, ListItemText } from '../components/List';
import { MainContent } from '../components/main-content';
import { OutLink } from '../components/OutLink';
import { PageTitleContainer } from '../components/page-title-container';

const WorkshopsPage = () => {
  const {
    allWorkshopsJson: { edges }
  } = useStaticQuery(graphql`
    query {
      allWorkshopsJson {
        edges {
          node {
            id
            url
            name
            description
          }
        }
      }
    }
  `);

  return (
    <MainContent as="div">
      <Helmet>
        <title>Workshops</title>
      </Helmet>
      <main>
        <PageTitleContainer title="Workshops" />
        <List>
          {edges.map(({ node: { id, name, url, description } }) => (
            <ListItem button component={OutLink} href={url} key={id} noGutter>
              <ListItemText
                primaryText={name}
                tertiaryText={description}
                boldPrimary
              />
            </ListItem>
          ))}
        </List>
      </main>
      <nav className="Toolbar center">
        <Link to="/" className="link-primary">
          Home
        </Link>
      </nav>
    </MainContent>
  );
};

export default WorkshopsPage;
