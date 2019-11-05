import * as React from 'react';
import { graphql } from 'gatsby';
import Image, { FluidObject } from 'gatsby-image';
import { LinkButton } from '../Button';
import styles from './workshop-card.module.scss';
import { getContrastTextColor } from '../../helper';

export type WorkshopCardProps = {
  id: string;
  name: string;
  themeColor: string;
  underConstruction: boolean;
  url: string;
  description: string;
  iconFile: {
    childImageSharp: {
      fluid: FluidObject;
    };
  } | null;
};

export const WorkshopCard = (props: WorkshopCardProps) => {
  return (
    <article className={styles.card} style={{ borderColor: props.themeColor }}>
      <div className={styles.content}>
        <h2 className={styles.title}>{props.name}</h2>
        <div className={styles.imageContainer}>
          {props.iconFile && (
            <Image fluid={props.iconFile.childImageSharp.fluid} alt="" />
          )}
        </div>
        <p className={styles.description}>{props.description}</p>
      </div>
      <div>
        <LinkButton
          style={{
            backgroundColor: props.themeColor,
            color: getContrastTextColor(props.themeColor),
          }}
          className={styles.button}
          to={props.url}
          raised
        >
          Learn
        </LinkButton>
      </div>
    </article>
  );
};

export const WorkshopCardContainer = (props: { children: React.ReactNode }) => {
  return <div className={styles.container}>{props.children}</div>;
};

export const query = graphql`
  fragment WorkshopCard on WorkshopsYaml {
    id
    name
    themeColor
    underConstruction
    description
    url
    iconFile {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
