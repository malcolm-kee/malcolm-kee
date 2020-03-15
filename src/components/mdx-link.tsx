import { Link } from 'gatsby';
import * as React from 'react';
import { OutLink } from './OutLink';

type MdxLinkProps = Omit<JSX.IntrinsicElements['a'], 'ref'>;

export const MdxLink = ({ href, children, ...props }: MdxLinkProps) => {
  if (!href) {
    return null;
  }
  if (href[0] === '/') {
    return (
      <Link to={href} {...props}>
        {children}
      </Link>
    );
  }
  if (href[0] === '#') {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }
  return (
    <OutLink href={href} {...props}>
      {children}
    </OutLink>
  );
};
