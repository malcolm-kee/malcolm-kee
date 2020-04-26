import React from 'react';
import { Seo } from '../Seo';
import { graphql } from 'gatsby';

export const WorkshopLandingSeo = (props) => {
  return (
    <Seo
      title={props.name}
      description={props.description}
      keywords={props.keywords}
      image={`/og_image/${props.id}.png`}
      icon={props.iconFile && props.iconFile.childImageSharp.resize.src}
    />
  );
};

export const query = graphql`
  fragment WorkshopLandingSeo on WorkshopsYaml {
    id
    name
    description
    keywords
    iconFile {
      childImageSharp {
        resize(width: 16, height: 16) {
          src
        }
      }
    }
  }
`;
