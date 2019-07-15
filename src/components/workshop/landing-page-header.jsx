import cx from 'classnames';
import React from 'react';
import './landing-page-header.scss';

export const LandingPageHeader = ({ children, inverse }) => (
  <header
    className={cx(
      'workshop-landing-page-header',
      inverse && 'workshop-landing-page-header--inverse'
    )}
  >
    {children}
  </header>
);

export default LandingPageHeader;
