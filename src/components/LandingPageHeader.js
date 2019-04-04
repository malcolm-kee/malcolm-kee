import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { BackgroundImg } from './BackgroundImage';
import './LandingPageHeader.scss';

export const LandingPageHeader = () => {
  const data = useStaticQuery(graphql`
    query {
      desktop: file(relativePath: { eq: "malcolm-kee.jpg" }) {
        childImageSharp {
          fluid(quality: 100, maxWidth: 2000) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  const imageData = data.desktop.childImageSharp.fluid;

  return (
    <BackgroundImg
      tag="header"
      className="landing-page-header"
      fluid={imageData}
      backgroundColor="#2a1e12"
    >
      <div className="landing-page-header-content">
        <ul className="landing-page-header-subtitle">
          <li>
            <span>Frontend Engineer</span>
          </li>
          <li>
            <span>Teacher</span>
          </li>
          <li>
            <span>Open Source Contributor</span>
          </li>
        </ul>
      </div>
    </BackgroundImg>
  );
};
