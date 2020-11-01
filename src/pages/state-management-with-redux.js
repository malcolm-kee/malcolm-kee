import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import * as React from 'react';
import { LinkButton } from '../components/Button';
import { WorkshopLandingPageBanner } from '../components/workshop/workshop-landing-page-banner';
import { WorkshopLandingPageFooter } from '../components/workshop/workshop-landing-page-footer';
import { WorkshopLandingSeo } from '../components/workshop/workshop-landing-seo';
import { logo } from './state-management-with-redux.module.css';

const PageHeader = () => {
  const { workshopsYaml } = useStaticQuery(graphql`
    {
      workshopsYaml(id: { eq: "state-management-with-redux" }) {
        ...WorkshopLandingSeo
        name
        description
        themeColor
        bigImage: iconFile {
          childImageSharp {
            fluid(maxWidth: 250) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  `);

  return (
    <>
      <WorkshopLandingSeo {...workshopsYaml} />
      <WorkshopLandingPageBanner inverse>
        <div>
          <div className="logo-section">
            <div className={logo}>
              <Image
                fluid={workshopsYaml.bigImage.childImageSharp.fluid}
                alt=""
              />
            </div>
          </div>
          <div className="landing-title-container">
            <h1
              className="landing-title"
              style={{ color: workshopsYaml.themeColor }}
            >
              {workshopsYaml.name}
            </h1>
            <p className="landing-subtitle">{workshopsYaml.description}</p>
            <div className="py-2 my-4">
              <LinkButton
                to="/state-management-with-redux/introduction/"
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
};

export default function ReactStateManagementWithRedux() {
  return (
    <>
      <PageHeader />
      <WorkshopLandingPageFooter />
    </>
  );
}
