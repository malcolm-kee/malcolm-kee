import { StaticQuery, graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

export const SiteMetadata = () => (
  <StaticQuery
    query={graphql`
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
    `}
    render={data => (
      <Helmet>
        <title>{data.site.siteMetadata.title}</title>
        <meta name="author" content={data.site.siteMetadata.author} />
        <meta name="description" content={data.site.siteMetadata.description} />
        <meta
          name="keywords"
          content={data.site.siteMetadata.keywords.join()}
        />
        <meta name="og:url" content={data.site.siteMetadata.siteUrl} />
        <meta name="og:title" content={data.site.siteMetadata.title} />
        <meta
          name="og:description"
          content={data.site.siteMetadata.description}
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:creator"
          content={data.site.siteMetadata.social.twitter}
        />
        <meta name="twitter:title" content={data.site.siteMetadata.title} />
        <meta
          name="twitter:description"
          content={data.site.siteMetadata.description}
        />
      </Helmet>
    )}
  />
);
