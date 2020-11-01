import { graphql, useStaticQuery } from 'gatsby';

export const useLastBuild = () => {
  const {
    site: { buildTime },
  } = useStaticQuery(graphql`
    {
      site {
        buildTime(formatString: "DD MMM YYYY")
      }
    }
  `);

  return buildTime;
};
