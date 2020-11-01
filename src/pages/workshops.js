import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { RoundedLinkButton } from '../components/Button';
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
