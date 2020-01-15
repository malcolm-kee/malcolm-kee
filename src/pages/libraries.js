import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import { List, ListItem, ListItemText } from '../components/List';
import { MainContent } from '../components/main-content';
import { PageTitleContainer } from '../components/page-title-container';
import { Seo } from '../components/Seo';

const LibrariesPage = () => {
  const {
    allNpmsIoMalcolm: { libraries },
  } = useStaticQuery(graphql`
    query {
      allNpmsIoMalcolm(sort: { fields: [date], order: DESC }) {
        libraries: nodes {
          name
          version
          description
          date(formatString: "DD MMM YYYY")
          links {
            homepage
          }
        }
      }
    }
  `);

  return (
    <MainContent as="div">
      <Seo title="Libraries - Malcolm Kee" />
      <main className="max-w-lg mx-auto">
        <PageTitleContainer title="Libraries" />
        <List>
          {libraries.map(({ name, description, version, links }) => (
            <ListItem link={links.homepage} key={name}>
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
