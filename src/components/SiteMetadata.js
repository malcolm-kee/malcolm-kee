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
            description
            keywords
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
      </Helmet>
    )}
  />
);
