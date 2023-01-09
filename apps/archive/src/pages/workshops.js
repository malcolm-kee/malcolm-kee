import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { RoundedLinkButton } from '../components/Button';
import { MainContent } from '../components/main-content';
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
        <div className="text-center my-6">
          <h1 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            Workshops
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
            Workshops that I've conducted.
          </p>
        </div>
        <WorkshopCardContainer>
          {nodes.map((node) => (
            <WorkshopCard {...node} key={node.id} />
          ))}
        </WorkshopCardContainer>
      </main>
      <nav className="text-center my-4 py-2">
        <RoundedLinkButton to="/">Home</RoundedLinkButton>
      </nav>
    </MainContent>
  );
};

export default WorkshopsPage;
