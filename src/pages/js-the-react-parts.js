import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import reactLogo from '../assets/react-logo.png';
import { LinkButton } from '../components/Button';
import { JsIcon } from '../components/svg-icons';
import { WorkshopLandingPageBanner } from '../components/workshop/workshop-landing-page-banner';
import { WorkshopLandingPageFooter } from '../components/workshop/workshop-landing-page-footer';
import { WorkshopLandingSeo } from '../components/workshop/workshop-landing-seo';
import './js-the-react-parts.scss';

/* eslint-disable no-script-url */

const PageHeader = () => {
  const { workshopsYaml } = useStaticQuery(graphql`
    {
      workshopsYaml(id: { eq: "js-the-react-parts" }) {
        ...WorkshopLandingSeo
      }
    }
  `);

  return (
    <>
      <WorkshopLandingPageBanner>
        <WorkshopLandingSeo {...workshopsYaml} />
        <div id="js-the-react-parts-landing">
          <div className="logo-section">
            <div className="icon-container">
              <div className="js-icon" id="js-icon">
                <JsIcon />
              </div>
              <div className="react-icon-container">
                <div className="react-icon-inner-container">
                  <img
                    src={reactLogo}
                    className="react-icon"
                    alt="react logo"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="landing-title-container">
            <h1 className="landing-title">
              <span className="javascript-text">JavaScript </span>
              <span className="react-text">The React Parts</span>
            </h1>
            <div className="my-2 py-2">
              <LinkButton
                to="/js-the-react-parts/introduction"
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

export default function JsTheReactParts() {
  return (
    <>
      <PageHeader />
      <WorkshopLandingPageFooter />
    </>
  );
}
