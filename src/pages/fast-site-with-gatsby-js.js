import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import { LinkButton } from '../components/Button';
import { GatsbyLogo } from '../components/gatsby-logo';
import { Seo } from '../components/Seo';
import { WorkshopLandingPageBanner } from '../components/workshop/workshop-landing-page-banner';
import { container } from './fast-site-with-gatsby-js.module.scss';

const PageHeader = () => {
  const { workshopsJson } = useStaticQuery(graphql`
    {
      workshopsJson(contentId: { eq: "fast-site-with-gatsby-js" }) {
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
      <div id="fast-site-with-gatsbyjs-landing">
        <div className="logo-section">
          <div className="icon-container">
            <div className={container}>
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
    </WorkshopLandingPageBanner>
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
