import * as React from 'react';
import { flushSync } from 'react-dom';
import { useHref, useLinkClickHandler, useNavigate } from 'react-router-dom';

export interface LinkProps extends Omit<React.ComponentPropsWithoutRef<'a'>, 'href'> {
  to: string;
  animateNavigation?: boolean;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function LinkImpl(
  { to, onClick, animateNavigation, ...linkProps },
  forwardedRef
) {
  const href = useHref(to);
  const navigate = useNavigate();

  const handleClick = useLinkClickHandler(to);

  return (
    <a
      {...linkProps}
      href={href}
      onClick={(ev) => {
        if (onClick) {
          onClick(ev);
        }
        if (!ev.defaultPrevented) {
          if (typeof document.startViewTransition === 'function' && animateNavigation) {
            ev.preventDefault();
            document.startViewTransition(() => flushSync(() => navigate(to)));
          } else {
            handleClick(ev);
          }
        }
      }}
      ref={forwardedRef}
    />
  );
});
