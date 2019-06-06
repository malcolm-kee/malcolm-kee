import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import reactLogo from '../assets/react-logo.png';
import { LinkButton } from '../components/Button';
import { JsIcon } from '../components/js-icon';
import { Seo } from '../components/Seo';
import { LandingPageHeader } from '../components/workshop/landing-page-header';
import './js-the-react-parts.scss';

/* eslint-disable no-script-url */

const PageHeader = () => {
  const { workshopsJson } = useStaticQuery(graphql`
    {
      workshopsJson(contentId: { eq: "js-the-react-parts" }) {
        description
        keywords
      }
    }
  `);

  return (
    <LandingPageHeader>
      <Seo
        title="JavaScript: The React Parts"
        description={workshopsJson.description}
        keywords={workshopsJson.keywords}
      />
      <div id="js-the-react-parts-landing">
        <div className="logo-section">
          <div className="icon-container">
            <div className="js-icon" id="js-icon">
              <JsIcon />
            </div>
            <div className="react-icon-container">
              <div className="react-icon-inner-container">
                <img src={reactLogo} className="react-icon" alt="react logo" />
              </div>
            </div>
          </div>
        </div>
        <div className="landing-title-container">
          <h1 className="landing-title">
            <span className="javascript-text">JavaScript </span>
            <span className="react-text">The React Parts</span>
          </h1>
          <div className="Toolbar">
            <LinkButton
              to="/js-the-react-parts/introduction"
              color="bubble"
              large
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
