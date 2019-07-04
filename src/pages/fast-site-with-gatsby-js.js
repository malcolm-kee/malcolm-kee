import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import { LinkButton } from '../components/Button';
import { GatsbyLogo } from '../components/gatsby-logo';
import { Seo } from '../components/Seo';
import { LandingPageHeader } from '../components/workshop/landing-page-header';
import { useFavIcon } from '../hooks/use-favicons';
import './fast-site-with-gatsby-js.scss';

const PageHeader = () => {
  const { workshopsJson } = useStaticQuery(graphql`
    {
      workshopsJson(contentId: { eq: "fast-site-with-gatsby-js" }) {
        name
        description
        keywords
        iconFile
      }
    }
  `);

  useFavIcon({
    iconFile: workshopsJson.iconFile,
    contentId: 'fast-site-with-gatsby-js',
  });

  return (
    <LandingPageHeader>
      <Seo
        title={workshopsJson.name}
        description={workshopsJson.description}
        keywords={workshopsJson.keywords}
      />
      <div id="fast-site-with-gatsbyjs-landing">
        <div className="logo-section">
          <div className="icon-container">
            <div className="gatsby-logo-container">
              <GatsbyLogo />
            </div>
          </div>
        </div>
        <div className="landing-title-container">
          <h1
            className="landing-title"
            style={{ color: workshopsJson.themeColor }}
          >
            {workshopsJson.name}
          </h1>
          <div className="Toolbar">
            <LinkButton
              to="/fast-site-with-gatsby-js/introduction"
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

export default function FastSiteWithGatsbyJs() {
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
