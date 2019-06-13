import { graphql, useStaticQuery } from 'gatsby';
import { joinClassName } from 'join-string';
import React from 'react';
import BackgroundImage from 'gatsby-background-image';
import './LandingPageBackground.scss';

export const LandingPageBackground = ({ className, ...props }) => {
  const data = useStaticQuery(graphql`
    query {
      background: file(relativePath: { eq: "malcolm-kee.jpg" }) {
        childImageSharp {
          fluid(quality: 100, maxWidth: 2000) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  `);

  const imageData = data.background.childImageSharp.fluid;

  return (
    <BackgroundImage
      fluid={imageData}
      backgroundColor="#2a1e12"
      className={joinClassName('landing-page-background', className)}
      {...props}
    />
  );
};
