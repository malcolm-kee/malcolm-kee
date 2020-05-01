import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { isArray } from 'typesafe-is';

export const Seo = ({
  title,
  description,
  keywords,
  image,
  icon,
  pathname,
}) => {
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

  return (
    <Helmet defer={false}>
      <title>{displayTitle}</title>
      <link rel="shortcut icon" href={icon || '/icons/icon-48x48.png'} />
      <meta name="author" content={siteMetadata.author} />
      <meta name="description" content={displayDescription} />
      <meta name="keywords" content={displayKeywords} />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={siteMetadata.siteUrl + (pathname || '')}
      />
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={displayDescription} />
      {image && (
        <meta property="og:image" content={siteMetadata.siteUrl + image} />
      )}
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
