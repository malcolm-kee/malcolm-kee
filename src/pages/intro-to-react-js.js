import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import { LinkButton } from '../components/Button';
import { ReactLogo } from '../components/react-logo';
import { WorkshopLandingPageBanner } from '../components/workshop/workshop-landing-page-banner';
import { WorkshopLandingSeo } from '../components/workshop/workshop-landing-seo';

const PageHeader = () => {
  const { workshopsYaml } = useStaticQuery(graphql`
    {
      workshopsYaml(id: { eq: "intro-to-react-js" }) {
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
        <div>
          <div className="logo-section">
            <ReactLogo />
          </div>
          <div className="landing-title-container">
            <h1
              className="landing-title"
              style={{ color: workshopsYaml.themeColor }}
            >
              {workshopsYaml.name}
            </h1>
            <div className="Toolbar Toolbar--space-vertical">
              <LinkButton
                to="/intro-to-react-js/introduction"
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

export default function IntroToReactJs() {
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
