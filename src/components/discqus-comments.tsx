import { DiscussionEmbed } from 'disqus-react';
import * as React from 'react';

// const DISCUQ_SHORTNAME = process.env.GATSBY_DISCUQ_NAME as string;
const DISCUQ_SHORTNAME = 'malcolmkee';

type DisqusCommentsProps = {
  identifier: string;
  title: string;
  url: string;
};

export default function DisqusComments(props: DisqusCommentsProps) {
  return (
    <DiscussionEmbed
      shortname={DISCUQ_SHORTNAME}
      config={{
        url: props.url,
        identifier: props.identifier,
        title: props.title,
      }}
    />
  );
}
