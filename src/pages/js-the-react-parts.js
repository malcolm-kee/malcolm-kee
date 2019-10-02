import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import reactLogo from '../assets/react-logo.png';
import { LinkButton } from '../components/Button';
import { Seo } from '../components/Seo';
import { JsIcon } from '../components/svg-icons';
import { WorkshopLandingPageBanner } from '../components/workshop/workshop-landing-page-banner';
import './js-the-react-parts.scss';

/* eslint-disable no-script-url */

const PageHeader = () => {
  const { workshopsYaml } = useStaticQuery(graphql`
    {
      workshopsYaml(id: { eq: "js-the-react-parts" }) {
        name
        description
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

export default function JsTheReactParts() {
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
