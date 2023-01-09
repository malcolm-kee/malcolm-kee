import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { RoundedLinkButton } from '../components/Button';
import { MainContent } from '../components/main-content';
import { OutLink } from '../components/OutLink';
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
    <MainContent className="py-3">
      <Seo title="Libraries - Malcolm Kee" />
      <div className="text-center">
        <h1 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
          Libraries
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
          Open source libraries that I've published.
        </p>
      </div>
      <ul className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
        {libraries.map(({ name, description, version, links }) => (
          <li className="rounded-lg shadow-lg overflow-hidden bg-white p-6">
            <OutLink to={links.homepage} className="flex flex-col h-full group">
              <h2 className="mt-2 text-xl leading-7 font-semibold text-gray-900 font-mono group-hover:underline">
                {name}
              </h2>
              <p className="mt-3 text-base leading-6 text-gray-500">
                {description}
              </p>
              <div className="mt-6 text-sm leading-5 text-gray-500">
                {version}
              </div>
            </OutLink>
          </li>
        ))}
      </ul>
      <nav className="text-center my-4 py-2">
        <RoundedLinkButton to="/">Home</RoundedLinkButton>
      </nav>
    </MainContent>
  );
};

export default LibrariesPage;
