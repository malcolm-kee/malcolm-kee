import React from 'react';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

interface OutlinkProps
  extends Omit<React.ComponentProps<typeof OutboundLink>, 'ref'> {
  to?: string;
}

export const OutLink = ({
  target = '_BLANK',
  rel = 'noopener noreferrer',
  to,
  href = to,
  ...linkProps
}: OutlinkProps) => (
  <OutboundLink target={target} rel={rel} href={href} {...linkProps} />
);
