import * as React from 'react';

interface OutlinkProps extends Omit<React.ComponentProps<'a'>, 'ref'> {
  to?: string;
}

export const OutLink = ({
  target = '_BLANK',
  rel = 'noopener noreferrer',
  to,
  href = to,
  ...linkProps
}: OutlinkProps) => <a target={target} rel={rel} href={href} {...linkProps} />;
