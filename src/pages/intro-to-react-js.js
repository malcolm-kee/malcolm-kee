import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import { LinkButton } from '../components/Button';
import { ReactLogo } from '../components/react-logo';
import { Seo } from '../components/Seo';
import { WorkshopLandingPageBanner } from '../components/workshop/workshop-landing-page-banner';

const PageHeader = () => {
  const { workshopsYaml } = useStaticQuery(graphql`
    {
      workshopsYaml(id: { eq: "intro-to-react-js" }) {
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
    <WorkshopLandingPageBanner>
      <Seo
        title={workshopsYaml.name}
        description={workshopsYaml.description}
        keywords={workshopsYaml.keywords}
        image={
          workshopsYaml.image && workshopsYaml.image.childImageSharp.resize.src
        }
        icon={
          workshopsYaml.iconFile &&
          workshopsYaml.iconFile.childImageSharp.resize.src
        }
      />
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
