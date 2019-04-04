import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { BackgroundImg } from './BackgroundImage';
import './LandingPageHeader.scss';

export const LandingPageHeader = () => {
  const data = useStaticQuery(graphql`
    query {
      background: file(relativePath: { eq: "malcolm-kee.jpg" }) {
        childImageSharp {
          fluid(quality: 100, maxWidth: 2000) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  const imageData = data.background.childImageSharp.fluid;

  return (
    <BackgroundImg
      tag="header"
      className="landing-page-header"
      fluid={imageData}
      backgroundColor="#2a1e12"
    >
      <div className="landing-page-header-content">
        <BackgroundImg
          tag="ul"
          className="landing-page-header-subtitle"
          fluid={imageData}
          backgroundColor="#2a1e12"
        >
          <li>
            <span>Frontend Engineer</span>
          </li>
          <li>
            <span>Teacher</span>
          </li>
          <li>
            <span>Open Source Contributor</span>
          </li>
        </BackgroundImg>
      </div>
    </BackgroundImg>
  );
};
