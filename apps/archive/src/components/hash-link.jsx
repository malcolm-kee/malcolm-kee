import { navigate } from '@reach/router';
import * as React from 'react';
import { callAll } from '../lib/fp';

export const HashLink = ({ target, onClick, children, ...props }) => {
  return (
    <a
      href={`#${target}`}
      onClick={callAll((ev) => {
        ev.preventDefault();
        navigate(`#${target}`, { replace: true });
      }, onClick)}
      {...props}
    >
      {children}
    </a>
  );
};
