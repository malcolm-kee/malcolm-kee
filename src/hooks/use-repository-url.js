import { graphql, useStaticQuery } from 'gatsby';

export const useRepositoryUrl = () => {
  const {
    site: {
      siteMetadata: { repositoryUrl },
    },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          repositoryUrl
        }
      }
    }
  `);

  return repositoryUrl;
};
