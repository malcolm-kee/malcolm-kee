import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import React from 'react';

export const GatsbyLogo = () => {
  const data = useStaticQuery(graphql`
    {
      image: file(relativePath: { eq: "gatsbyjs.png" }) {
        childImageSharp {
          fluid(maxWidth: 250) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  `);

  return <Image fluid={data.image.childImageSharp.fluid} />;
};
