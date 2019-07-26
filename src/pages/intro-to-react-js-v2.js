import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import { LinkButton } from '../components/Button';
import { ReactLogo } from '../components/react-logo';
import { Seo } from '../components/Seo';
import { LandingPageHeader } from '../components/workshop/landing-page-header';
import './intro-to-react-js-v2.scss';

const PageHeader = () => {
  const { workshopsJson } = useStaticQuery(graphql`
    {
      workshopsJson(contentId: { eq: "intro-to-react-js-v2" }) {
        name
        description
        keywords
        themeColor
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
    <LandingPageHeader>
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
      <div id="intro-to-react-js-v2-landing">
        <div className="logo-section">
          <div className="react-logo-container">
            <ReactLogo />
          </div>
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
              to="/intro-to-react-js-v2/introduction"
              color="bubble"
              size="large"
            >
              Start
            </LinkButton>
          </div>
        </div>
      </div>
    </LandingPageHeader>
  );
};

export default function IntroToReactJsV2() {
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
