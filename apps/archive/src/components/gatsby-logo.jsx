import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import * as React from 'react';

export const GatsbyLogo = () => {
  const data = useStaticQuery(graphql`
    {
      image: file(relativePath: { eq: "gatsbyjs.png" }) {
        childImageSharp {
          fluid(maxWidth: 250) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  return <Image fluid={data.image.childImageSharp.fluid} alt="Gatsby Logo" />;
};
