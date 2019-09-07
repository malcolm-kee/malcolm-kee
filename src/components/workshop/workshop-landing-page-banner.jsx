import cx from 'classnames';
import React from 'react';
import './workshop-landing-page-banner.scss';

export const WorkshopLandingPageBanner = ({ children, inverse }) => (
  <header
    className={cx(
      'workshop-landing-page-header',
      inverse && 'workshop-landing-page-header--inverse'
    )}
  >
    {children}
  </header>
);
