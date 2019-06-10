import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import reactLogo from '../assets/react-logo.png';
import { LinkButton } from '../components/Button';
import { Seo } from '../components/Seo';
import { LandingPageHeader } from '../components/workshop/landing-page-header';
import { useFavIcon } from '../hooks/use-favicons';
import './intro-to-react-js-v2.scss';

const PageHeader = () => {
  const { workshopsJson } = useStaticQuery(graphql`
    {
      workshopsJson(contentId: { eq: "intro-to-react-js-v2" }) {
        name
        description
        keywords
        iconFile
      }
    }
  `);

  useFavIcon({
    iconFile: workshopsJson.iconFile,
    contentId: 'intro-to-react-js-v2',
  });

  return (
    <LandingPageHeader>
      <Seo
        title={workshopsJson.name}
        description={workshopsJson.description}
        keywords={workshopsJson.keywords}
      />
      <div id="intro-to-react-js-v2-landing">
        <div className="logo-section">
          <img src={reactLogo} className="react-icon" alt="react logo" />
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

export default PageHeader;
