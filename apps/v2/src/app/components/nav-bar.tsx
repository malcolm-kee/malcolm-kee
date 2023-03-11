import * as React from 'react';

export const NavBar = (props: { children: React.ReactNode }) => (
  <div className="mb-3 [view-transition-name:navbar]" {...props} />
);
