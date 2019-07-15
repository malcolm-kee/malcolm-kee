import { graphql, Link, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import React from 'react';
import { LinkButton } from '../components/Button';
import { Seo } from '../components/Seo';
import { LandingPageHeader } from '../components/workshop/landing-page-header';
import { logo } from './react-state-management-with-redux.module.scss';

const PageHeader = () => {
  const { workshopsJson } = useStaticQuery(graphql`
    {
      workshopsJson(contentId: { eq: "react-state-management-with-redux" }) {
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
        bigImage: iconFile {
          childImageSharp {
            fluid(maxWidth: 250) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  `);

  return (
    <>
      <LandingPageHeader inverse>
        <Seo
          title={workshopsJson.name}
          description={workshopsJson.description}
          keywords={workshopsJson.keywords}
          image={
            workshopsJson.image &&
            workshopsJson.image.childImageSharp.resize.src
          }
          icon={
            workshopsJson.iconFile &&
            workshopsJson.iconFile.childImageSharp.resize.src
          }
        />
        <div>
          <div className="logo-section">
            <div className={logo}>
              <Image
                fluid={workshopsJson.bigImage.childImageSharp.fluid}
                alt=""
              />
            </div>
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
                to="/react-state-management-with-redux/introduction"
                color="bubble"
                size="large"
              >
                Start
              </LinkButton>
            </div>
          </div>
        </div>
      </LandingPageHeader>
    </>
  );
};

export default function ReactStateManagementWithRedux() {
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
