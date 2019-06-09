import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import toolboxIcon from '../assets/toolbox.svg';
import { LinkButton } from '../components/Button';
import { OutLink } from '../components/OutLink';
import { Seo } from '../components/Seo';
import { LandingPageHeader } from '../components/workshop/landing-page-header';
import { useFavIcon } from '../hooks/use-favicons';
import './web-developer-toolbox.scss';

/* eslint-disable no-script-url */

const PageHeader = () => {
  const { workshopsJson } = useStaticQuery(graphql`
    {
      workshopsJson(contentId: { eq: "web-developer-toolbox" }) {
        name
        description
        keywords
        themeColor
        iconFile
      }
    }
  `);

  useFavIcon({
    iconFile: workshopsJson.iconFile,
    contentId: 'web-developer-toolbox',
  });

  return (
    <>
      <LandingPageHeader>
        <Seo
          title={workshopsJson.name}
          description={workshopsJson.description}
          keywords={workshopsJson.keywords}
        />
        <div>
          <div className="logo-section">
            <img src={toolboxIcon} alt="" id="web-developer-toolbox-icon" />
          </div>
          <div className="landing-title-container">
            <h1
              className="landing-title"
              style={{ color: workshopsJson.themeColor }}
            >
              {workshopsJson.name}
            </h1>
            <p className="landing-subtitle">{workshopsJson.description}</p>
            <div className="Toolbar Toolbar--space-vertical">
              <LinkButton
                to="/web-developer-toolbox/introduction"
                color="bubble"
                large
              >
                Start
              </LinkButton>
            </div>
          </div>
        </div>
      </LandingPageHeader>
      {flatIconAttribution}
    </>
  );
};

const flatIconAttribution = (
  <div className="Toolbar right">
    <small>
      Icons made by{' '}
      <OutLink href="https://www.freepik.com/" style={{ color: 'inherit' }}>
        Freepik
      </OutLink>{' '}
      from{' '}
      <OutLink href="https://www.flaticon.com/" style={{ color: 'inherit' }}>
        www.flaticon.com
      </OutLink>{' '}
      is licensed by{' '}
      <OutLink
        href="http://creativecommons.org/licenses/by/3.0/"
        style={{ color: 'inherit' }}
      >
        CC 3.0 BY
      </OutLink>
    </small>
  </div>
);

export default PageHeader;
