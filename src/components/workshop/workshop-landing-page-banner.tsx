import cx from 'classnames';
import * as React from 'react';
import './workshop-landing-page-banner.css';

export type WorkshopLandingPageBannerProps = {
  children: React.ReactNode;
  inverse?: boolean;
};

export const WorkshopLandingPageBanner = ({
  children,
  inverse,
}: WorkshopLandingPageBannerProps) => (
  <main
    className={cx(
      'workshop-landing-page-header',
      inverse && 'workshop-landing-page-header--inverse'
    )}
  >
    {children}
  </main>
);
