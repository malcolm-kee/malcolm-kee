import { navigate } from '@reach/router';
import React from 'react';
import { callAll } from '../helper';

export const HashLink = ({ target, onClick, ...props }) => {
  return (
    <a
      href={`#${target}`}
      onClick={callAll(ev => {
        ev.preventDefault();
        navigate(`#${target}`);
      }, onClick)}
      {...props}
    />
  );
};
