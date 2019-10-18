import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import { LinkButton } from '../components/Button';
import { ReactTypescriptIcon } from '../components/react-typescript-icon';
import { WorkshopLandingPageBanner } from '../components/workshop/workshop-landing-page-banner';
import { WorkshopLandingSeo } from '../components/workshop/workshop-landing-seo';
import styles from './typescript-for-react-developer.module.scss';

const PageHeader = () => {
  const { workshop } = useStaticQuery(graphql`
    {
      workshop: workshopsYaml(id: { eq: "typescript-for-react-developer" }) {
        ...WorkshopLandingSeo
      }
    }
  `);

  return (
    <>
      <WorkshopLandingSeo {...workshop} />
      <WorkshopLandingPageBanner inverse>
        <div id="typescript-for-react-developer-landing">
          <div className="logo-section">
            <div className="icon-container">
              <div className={styles.iconWrapper}>
                <ReactTypescriptIcon nucleusClassName={styles.nucleus} />
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
    </>
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
