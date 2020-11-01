import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import * as React from 'react';

export const JQueryLogo = () => {
  const data = useStaticQuery(graphql`
    {
      image: file(relativePath: { eq: "jquery.png" }) {
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  return <Image fluid={data.image.childImageSharp.fluid} alt="JQuery Logo" />;
};
