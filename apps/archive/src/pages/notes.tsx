import { graphql, Link, PageProps } from 'gatsby';
import * as React from 'react';
import { MainContent } from '../components/main-content';
import { PageTitleContainer } from '../components/page-title-container';
import { Seo } from '../components/Seo';

const Notes = (props: PageProps<PageData>) => {
  return (
    <>
      <Seo title="Notes" pathname={props.location.pathname} />
      <MainContent className="max-w-xl">
        <PageTitleContainer title="Notes" />
        <ul className="text-center">
          {props.data.allNote.nodes.map((note) => (
            <li key={note.slug}>
              <Link to={note.slug} className="text-xl mb-3 link">
                {note.title}
              </Link>
            </li>
          ))}
        </ul>
      </MainContent>
    </>
  );
};

export default Notes;

type PageData = {
  allNote: {
    nodes: Array<{ slug: string; title: string }>;
  };
};

export const pageQuery = graphql`
  query {
    allNote {
      nodes {
        slug
        title
      }
    }
  }
`;
