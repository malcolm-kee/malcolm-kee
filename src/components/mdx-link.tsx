import { Link } from 'gatsby';
import * as React from 'react';
import { OutLink } from './OutLink';

type MdxLinkProps = Omit<JSX.IntrinsicElements['a'], 'ref'>;

export const MdxLink = ({ href, ...props }: MdxLinkProps) => {
  if (href && href[0] === '/') {
    return <Link to={href} {...props} />;
  }
  return <OutLink href={href} {...props} />;
};
