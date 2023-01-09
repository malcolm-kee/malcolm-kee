import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import * as React from 'react';

export const ReactLogo = () => {
  const data = useStaticQuery(graphql`
    {
      image: file(relativePath: { eq: "react-logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 320) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  `);

  return <Image fluid={data.image.childImageSharp.fluid} />;
};
