import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { isArray } from 'typesafe-is';

export type SeoProps = {
  title?: string;
  type?: 'website' | 'article';
  description?: string;
  keywords?: string[];
  image?: string;
  icon?: string;
  pathname?: string;
  tags?: string[];
};

export const Seo = ({
  title,
  description,
  keywords,
  image,
  icon,
  pathname,
  type = 'website',
  tags,
}: SeoProps) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query MetadataQuery {
        site {
          siteMetadata {
            title
            author
            siteUrl
            description
            keywords
            social {
              twitter
            }
          }
        }
      }
    `
  );

  const displayTitle = title || siteMetadata.title;
  const displayDescription = description || siteMetadata.description;
  const displayKeywords =
    isArray(keywords) && keywords.length > 0
      ? keywords.join()
      : siteMetadata.keywords.join();

  const tagsMeta =
    type === 'article' &&
    Array.isArray(tags) &&
    tags.map((tag) => (
      <meta property="article:tag" content={tag} key={`tag-${tag}`} />
    ));

  return (
    <Helmet defer={false}>
      <title>{displayTitle}</title>
      <link rel="shortcut icon" href={icon || '/icons/icon-48x48.png'} />
      <meta name="author" content={siteMetadata.author} />
      <meta name="description" content={displayDescription} />
      <meta name="keywords" content={displayKeywords} />
      <meta property="og:type" content={type} />
      <meta
        property="og:url"
        content={siteMetadata.siteUrl + (pathname || '')}
      />
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={displayDescription} />
      {image && (
        <meta property="og:image" content={siteMetadata.siteUrl + image} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={siteMetadata.author} />
      )}
      {tagsMeta}
      <meta
        name="twitter:card"
        content={image ? 'summary_large_image' : 'summary'}
      />
      <meta name="twitter:creator" content={siteMetadata.social.twitter} />
      <meta name="twitter:title" content={displayTitle} />
      <meta name="twitter:description" content={displayDescription} />
      {image && (
        <meta name="twitter:image" content={siteMetadata.siteUrl + image} />
      )}
    </Helmet>
  );
};
