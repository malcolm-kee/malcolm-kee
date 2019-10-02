import { graphql, Link, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import React from 'react';
import { LinkButton } from '../components/Button';
import { Seo } from '../components/Seo';
import { WorkshopLandingPageBanner } from '../components/workshop/workshop-landing-page-banner';
import { logo } from './state-management-with-redux.module.scss';

const PageHeader = () => {
  const { workshopsYaml } = useStaticQuery(graphql`
    {
      workshopsYaml(id: { eq: "state-management-with-redux" }) {
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
      <WorkshopLandingPageBanner inverse>
        <Seo
          title={workshopsYaml.name}
          description={workshopsYaml.description}
          keywords={workshopsYaml.keywords}
          image={
            workshopsYaml.image &&
            workshopsYaml.image.childImageSharp.resize.src
          }
          icon={
            workshopsYaml.iconFile &&
            workshopsYaml.iconFile.childImageSharp.resize.src
          }
        />
        <div>
          <div className="logo-section">
            <div className={logo}>
              <Image
                fluid={workshopsYaml.bigImage.childImageSharp.fluid}
                alt=""
              />
            </div>
          </div>
          <div className="landing-title-container">
            <h1
              className="landing-title"
              style={{ color: workshopsYaml.themeColor }}
            >
              {workshopsYaml.name}
            </h1>
            <p className="landing-subtitle">{workshopsYaml.description}</p>
            <div className="Toolbar Toolbar--space-vertical">
              <LinkButton
                to="/state-management-with-redux/introduction"
                color="bubble"
                size="large"
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
