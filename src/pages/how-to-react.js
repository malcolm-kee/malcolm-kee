import { Link, graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { LinkButton } from '../components/Button';
import { ReactLogo } from '../components/react-logo';
import { Seo } from '../components/Seo';
import { LandingPageHeader } from '../components/workshop/landing-page-header';
import { useFavIcon } from '../hooks/use-favicons';
import './how-to-react.scss';

const PageHeader = () => {
  const { workshopsJson } = useStaticQuery(graphql`
    {
      workshopsJson(contentId: { eq: "how-to-react" }) {
        name
        description
        keywords
        iconFile
      }
    }
  `);

  useFavIcon({
    iconFile: workshopsJson.iconFile,
    contentId: 'how-to-react',
  });

  return (
    <LandingPageHeader>
      <Seo
        title={workshopsJson.name}
        description={workshopsJson.description}
        keywords={workshopsJson.keywords}
      />
      <div id="how-to-react-landing">
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

export default function HowToReact() {
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
