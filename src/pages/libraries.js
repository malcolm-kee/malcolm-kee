import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import { List, ListItem, ListItemText } from '../components/List';
import { MainContent } from '../components/main-content';
import { OutLink } from '../components/OutLink';
import { PageTitleContainer } from '../components/page-title-container';
import { Seo } from '../components/Seo';

const LibrariesPage = () => {
  const {
    allNpmsIoMalcolm: { edges },
  } = useStaticQuery(graphql`
    query {
      allNpmsIoMalcolm(sort: { fields: [date], order: DESC }) {
        edges {
          node {
            name
            version
            description
            date(formatString: "DD MMM YYYY")
            links {
              npm
            }
          }
        }
      }
    }
  `);

  return (
    <MainContent as="div">
      <Seo title="Libraries - Malcolm Kee" />
      <main>
        <PageTitleContainer title="Libraries" />
        <List>
          {edges.map(({ node: { name, description, version, links } }) => (
            <ListItem
              button
              component={OutLink}
              href={links.npm}
              key={name}
              noGutter
            >
              <ListItemText
                primaryText={name}
                secondaryText={description}
                tertiaryText={version}
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

export default LibrariesPage;
