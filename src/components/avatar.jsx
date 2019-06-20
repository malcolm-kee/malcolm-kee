import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Image from 'gatsby-image';

export const Avatar = () => {
  const data = useStaticQuery(graphql`
    {
      image: file(relativePath: { eq: "malcolm-kee-square.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 500) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  return <Image fluid={data.image.childImageSharp.fluid} />;
};
