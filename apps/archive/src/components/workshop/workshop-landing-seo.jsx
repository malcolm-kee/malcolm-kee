import * as React from 'react';
import { Seo } from '../Seo';
import { graphql } from 'gatsby';

export const WorkshopLandingSeo = (props) => {
  return (
    <Seo
      title={props.name}
      description={props.description}
      keywords={props.keywords}
      image={`https://malcolm-kee-og.vercel.app/api/og?title=${
        props.name
      }&bgImage=${encodeURIComponent(
        props.iconUrl
      )}&borderColor=${normalizeColor(props.themeColor)}`}
      icon={props.iconFile && props.iconFile.childImageSharp.resize.src}
    />
  );
};

/**
 *
 * @param {string} color : ;
 */
const normalizeColor = (color) =>
  color && color.startsWith('#') ? color.slice(1) : color;

export const query = graphql`
  fragment WorkshopLandingSeo on WorkshopsYaml {
    id
    name
    description
    keywords
    iconUrl
    themeColor
    iconFile {
      childImageSharp {
        resize(width: 16, height: 16) {
          src
        }
      }
    }
  }
`;
