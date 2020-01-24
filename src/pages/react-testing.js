import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import React from 'react';
import { LinkButton } from '../components/Button';
import { WorkshopLandingPageBanner } from '../components/workshop/workshop-landing-page-banner';
import { WorkshopLandingSeo } from '../components/workshop/workshop-landing-seo';

function ReactTesting() {
  const { workshop } = useStaticQuery(graphql`
    {
      workshop: workshopsYaml(id: { eq: "react-testing" }) {
        ...WorkshopLandingSeo
        name
        description
        icon: iconFile {
          childImageSharp {
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  `);

  return (
    <>
      <WorkshopLandingSeo {...workshop} />
      <WorkshopLandingPageBanner>
        <div>
          <div className="mx-auto max-w-sm">
            <Image fluid={workshop.icon.childImageSharp.fluid} />
          </div>
          <div className="landing-title-container">
            <h1 className="landing-title">{workshop.name}</h1>
            <p className="landing-subtitle">{workshop.description}</p>
            <div className="py-2 my-2">
              <LinkButton
                to="/typescript-for-react-developer/introduction"
                color="primary"
                minWidth="widest"
                className="text-2xl"
              >
                Start
              </LinkButton>
            </div>
          </div>
        </div>
      </WorkshopLandingPageBanner>
    </>
  );
}

export default ReactTesting;
