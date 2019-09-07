import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import { LinkButton } from '../components/Button';
import { ReactLogo } from '../components/react-logo';
import { Seo } from '../components/Seo';
import { WorkshopLandingPageBanner } from '../components/workshop/workshop-landing-page-banner';

const PageHeader = () => {
  const { workshopsJson } = useStaticQuery(graphql`
    {
      workshopsJson(contentId: { eq: "intro-to-react-js" }) {
        name
        description
        themeColor
        keywords
        iconFile {
          childImageSharp {
            resize(width: 16, height: 16) {
              src
            }
          }
        }
        image: iconFile {
          childImageSharp {
            resize(width: 300, height: 157) {
              src
            }
          }
        }
      }
    }
  `);

  return (
    <WorkshopLandingPageBanner inverse>
      <Seo
        title={workshopsJson.name}
        description={workshopsJson.description}
        keywords={workshopsJson.keywords}
        image={
          workshopsJson.image && workshopsJson.image.childImageSharp.resize.src
        }
        icon={
          workshopsJson.iconFile &&
          workshopsJson.iconFile.childImageSharp.resize.src
        }
      />
      <div>
        <div className="logo-section">
          <ReactLogo />
        </div>
        <div className="landing-title-container">
          <h1
            className="landing-title"
            style={{ color: workshopsJson.themeColor }}
          >
            {workshopsJson.name}
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
