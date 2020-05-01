import cx from 'classnames';
import * as React from 'react';
import './workshop-landing-page-banner.scss';

export const WorkshopLandingPageBanner = ({ children, inverse }) => (
  <main
    className={cx(
      'workshop-landing-page-header',
      inverse && 'workshop-landing-page-header--inverse'
    )}
  >
    {children}
  </main>
);
