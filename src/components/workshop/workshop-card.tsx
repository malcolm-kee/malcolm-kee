import * as React from 'react';
import { graphql } from 'gatsby';
import Image, { FluidObject } from 'gatsby-image';
import { LinkButton } from '../Button';
import styles from './workshop-card.module.scss';

export type WorkshopCardProps = {
  id: string;
  name: string;
  themeColor: string;
  contrastColor: string;
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
    <article
      className={`workshop-card ${styles.card}`}
      style={{ borderColor: props.themeColor }}
    >
      <div className={styles.content}>
        <h2 className={`mb-2 text-2xl leading-snug font-bold ${styles.title}`}>
          {props.name}
        </h2>
        <div className={styles.imageContainer}>
          {props.iconFile && (
            <Image fluid={props.iconFile.childImageSharp.fluid} alt="" />
          )}
        </div>
        <p className={styles.description}>{props.description}</p>
        {props.underConstruction && (
          <span className={styles.badge}>In Progress</span>
        )}
      </div>
      <div>
        <LinkButton
          style={{
            backgroundColor: props.themeColor,
            color: props.contrastColor,
          }}
          className="w-full text-lg"
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
    contrastColor
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
