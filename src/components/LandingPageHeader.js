import React from 'react';
import { LandingPageBackground } from './LandingPageBackground';
import './LandingPageHeader.scss';

export const LandingPageHeader = () => {
  return (
    <LandingPageBackground Tag="header" className="landing-page-header">
      <div className="landing-page-header-content">
        <LandingPageBackground
          Tag="ul"
          className="landing-page-header-subtitle"
        >
          <li>
            <span>Frontend Engineer</span>
          </li>
          <li>
            <span>Teacher</span>
          </li>
          <li>
            <span>Open Source Contributor</span>
          </li>
        </LandingPageBackground>
      </div>
    </LandingPageBackground>
  );
};
