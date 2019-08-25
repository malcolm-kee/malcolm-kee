import React from 'react';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

export const OutLink = ({
  target = '_BLANK',
  rel = 'noopener noreferrer',
  to,
  href = to,
  ...linkProps
}) => <OutboundLink target={target} rel={rel} href={href} {...linkProps} />;
