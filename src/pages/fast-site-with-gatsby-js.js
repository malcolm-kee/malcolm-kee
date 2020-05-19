import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { LinkButton } from '../components/Button';
import { GatsbyLogo } from '../components/gatsby-logo';
import { WorkshopLandingPageBanner } from '../components/workshop/workshop-landing-page-banner';
import { WorkshopLandingPageFooter } from '../components/workshop/workshop-landing-page-footer';
import { WorkshopLandingSeo } from '../components/workshop/workshop-landing-seo';
import { container } from './fast-site-with-gatsby-js.module.scss';

const PageHeader = () => {
  const { workshopsYaml } = useStaticQuery(graphql`
    {
      workshopsYaml(id: { eq: "fast-site-with-gatsby-js" }) {
        ...WorkshopLandingSeo
        name
        themeColor
      }
    }
  `);

  return (
    <>
      <WorkshopLandingSeo {...workshopsYaml} />
      <WorkshopLandingPageBanner>
        <div id="fast-site-with-gatsbyjs-landing">
          <div className="logo-section">
            <div className="icon-container">
              <div className={container}>
                <GatsbyLogo />
              </div>
            </div>
          </div>
          <div className="landing-title-container">
            <h1
              className="landing-title"
              style={{ color: workshopsYaml.themeColor }}
            >
              {workshopsYaml.name}
            </h1>
            <div className="my-2 py-2">
              <LinkButton
                to="/fast-site-with-gatsby-js/introduction/"
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

export default function FastSiteWithGatsbyJs() {
  return (
    <>
      <PageHeader />
      <WorkshopLandingPageFooter />
    </>
  );
}
