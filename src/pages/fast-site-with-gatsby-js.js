import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import { LinkButton } from '../components/Button';
import { GatsbyLogo } from '../components/gatsby-logo';
import { WorkshopLandingPageBanner } from '../components/workshop/workshop-landing-page-banner';
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
            <div className="Toolbar">
              <LinkButton
                to="/fast-site-with-gatsby-js/introduction"
                color="bubble"
                size="large"
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
      <nav className="Toolbar center">
        <Link className="link-primary" to="/workshops">
          All Workshops
        </Link>
      </nav>
    </>
  );
}
