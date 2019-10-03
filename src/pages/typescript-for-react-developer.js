import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import { LinkButton } from '../components/Button';
import { ReactTypescriptIcon } from '../components/react-typescript-icon';
import { Seo } from '../components/Seo';
import { WorkshopLandingPageBanner } from '../components/workshop/workshop-landing-page-banner';
import { container } from './fast-site-with-gatsby-js.module.scss';
import styles from './typescript-for-react-developer.module.scss';

const PageHeader = () => {
  const { workshop } = useStaticQuery(graphql`
    {
      workshop: workshopsYaml(id: { eq: "typescript-for-react-developer" }) {
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
      }
    }
  `);

  return (
    <WorkshopLandingPageBanner inverse>
      <Seo
        title={workshop.name}
        description={workshop.description}
        keywords={workshop.keywords}
        image={workshop.image && workshop.image.childImageSharp.resize.src}
        icon={workshop.iconFile && workshop.iconFile.childImageSharp.resize.src}
      />
      <div id="typescript-for-react-developer-landing">
        <div className="logo-section">
          <div className="icon-container">
            <div className={container}>
              <ReactTypescriptIcon />
            </div>
          </div>
        </div>
        <div className="landing-title-container">
          <h1 className="landing-title">
            <span className={styles.typescript}>TypeScript</span>
            <span className={styles.title}>for React Developer</span>
          </h1>
          <div className="Toolbar">
            <LinkButton
              to="/typescript-for-react-developer/introduction"
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

export default function TypescriptForReactDeveloper() {
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
