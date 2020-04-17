import { useStaticQuery, graphql } from 'gatsby';
import { DiscussionEmbed } from 'disqus-react';
import * as React from 'react';
import { useTheme } from '../theme';

// const DISCUQ_SHORTNAME = process.env.GATSBY_DISCUQ_NAME as string;
const DISCUQ_SHORTNAME = 'malcolmkee';

type DisqusCommentsProps = {
  identifier: string;
  title: string;
  url: string;
};

export default function DisqusComments(props: DisqusCommentsProps) {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `
  );

  const [theme] = useTheme();

  const discuqProps = {
    shortname: DISCUQ_SHORTNAME,
    config: {
      url: siteMetadata.siteUrl + props.url,
      identifier: props.identifier,
      title: props.title,
    },
    theme,
  };

  return <DiscussionEmbed {...discuqProps} />;
}
