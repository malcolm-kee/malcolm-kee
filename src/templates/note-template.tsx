import { graphql, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import * as React from 'react';
import { MainContent } from '../components/main-content';
import { Seo } from '../components/Seo';

const NoteTemplate = ({
  data: { note },
  location,
}: PageProps<PageQueryData>) => {
  return (
    <>
      <Seo title={note.title} pathname={location.pathname} />
      <MainContent>
        <div className="max-w-lg mx-auto">
          <article className="article-content px-4 mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl leading-loose hyphen-auto">
              {note.title}
            </h1>
            <MDXRenderer>{note.body}</MDXRenderer>
          </article>
        </div>
      </MainContent>
    </>
  );
};

export default NoteTemplate;

type PageQueryData = {
  note: {
    title: string;
    body: string;
  };
};

export const pageQuery = graphql`
  query NoteById($id: String!) {
    note(id: { eq: $id }) {
      title
      body
    }
  }
`;
