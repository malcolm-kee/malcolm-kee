import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import Image from 'gatsby-image';

export const Avatar = () => {
  const data = useStaticQuery(graphql`
    {
      image: file(relativePath: { eq: "malcolm-in-cpg.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 300, fit: CONTAIN) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  return <Image fluid={data.image.childImageSharp.fluid} />;
};
