import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import {
  List,
  ListItem,
  ListItemLabel,
  ListItemText,
} from '../components/List';
import { MainContent } from '../components/main-content';
import { OutLink } from '../components/OutLink';
import { PageTitleContainer } from '../components/page-title-container';
import { Seo } from '../components/Seo';

const WorkshopsPage = () => {
  const {
    allWorkshopsJson: { edges },
  } = useStaticQuery(graphql`
    query {
      allWorkshopsJson {
        edges {
          node {
            id
            url
            name
            description
            underConstruction
          }
        }
      }
    }
  `);

  return (
    <MainContent as="div">
      <Seo title="Workshops by Malcolm Kee" />
      <main>
        <PageTitleContainer title="Workshops" />
        <List>
          {edges.map(
            ({ node: { id, name, url, description, underConstruction } }) => (
              <ListItem
                button={true}
                component={url[0] === '/' ? Link : OutLink}
                to={url}
                key={id}
                noGutter
              >
                <ListItemText
                  primaryText={name}
                  tertiaryText={description}
                  boldPrimary
                />
                {underConstruction && <ListItemLabel>WIP</ListItemLabel>}
              </ListItem>
            )
          )}
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
