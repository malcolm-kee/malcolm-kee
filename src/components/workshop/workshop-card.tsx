import * as React from 'react';
import { graphql } from 'gatsby';
import Image, { FluidObject } from 'gatsby-image';
import { LinkButton } from '../Button';
import styles from './workshop-card.module.css';

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
      className="workshop-card relative p-3 border-l-4 md:border-l-8 rounded sm:rounded-lg shadow bg-gray-100 dark:bg-gray-800"
      style={{ borderColor: props.themeColor }}
    >
      <div className="lg:flex lg:flex-row-reverse lg:items-start h-full">
        <div className="float-right lg:float-none w-1/4 ml-2">
          {props.iconFile && (
            <Image fluid={props.iconFile.childImageSharp.fluid} alt="" />
          )}
        </div>
        <div className="px-2 flex-1 h-full flex flex-col">
          <h2 className="mb-2 text-2xl leading-snug font-bold text-gray-700 dark:text-gray-400">
            {props.name}
          </h2>
          <p className="leading-relaxed flex-1">{props.description}</p>
          <div className="pt-4 pb-2">
            <LinkButton
              style={{
                backgroundColor: props.themeColor,
                color: props.contrastColor,
              }}
              className="text-lg w-40"
              to={props.url}
              raised
            >
              Learn
            </LinkButton>
          </div>
        </div>
      </div>
      {props.underConstruction && (
        <span className={styles.badge}>In Progress</span>
      )}
    </article>
  );
};

export const WorkshopCardContainer = (props: { children: React.ReactNode }) => {
  return (
    <div className="grid p-3 gap-3 lg:gap-5 grid-cols-1 lg:grid-cols-2">
      {props.children}
    </div>
  );
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
