import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import React from 'react';

export const ReactTypescriptLogo = () => {
  const data = useStaticQuery(graphql`
    {
      image: file(relativePath: { eq: "react-typescript.png" }) {
        childImageSharp {
          fluid(maxWidth: 250) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  return (
    <Image
      fluid={data.image.childImageSharp.fluid}
      alt="React Typescript Logo"
    />
  );
};
