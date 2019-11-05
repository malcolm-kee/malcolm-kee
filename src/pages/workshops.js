import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import {
  List,
  ListItem,
  ListItemLabel,
  ListItemText,
} from '../components/List';
import { MainContent } from '../components/main-content';
import { PageTitleContainer } from '../components/page-title-container';
import { Seo } from '../components/Seo';
import {
  WorkshopCard,
  WorkshopCardContainer,
} from '../components/workshop/workshop-card';

const WorkshopsPage = ({ location }) => {
  const {
    allWorkshopsYaml: { nodes },
  } = useStaticQuery(graphql`
    query {
      allWorkshopsYaml {
        nodes {
          ...WorkshopCard
        }
      }
    }
  `);

  return (
    <MainContent as="div">
      <Seo title="Workshops by Malcolm Kee" pathname={location.pathname} />
      <main>
        <PageTitleContainer title="Workshops" />
        <WorkshopCardContainer>
          {nodes.map(node => (
            <WorkshopCard {...node} key={node.id} />
          ))}
        </WorkshopCardContainer>
        <List>
          {nodes.map(({ id, name, url, description, underConstruction }) => (
            <ListItem link={url} key={id}>
              <ListItemText
                primaryText={name}
                tertiaryText={description}
                boldPrimary
                className="workshop-item"
              />
              {underConstruction && <ListItemLabel>WIP</ListItemLabel>}
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
