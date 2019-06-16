import { Link } from 'gatsby';
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
            <Link to="/projects">Frontend Engineer</Link>
          </li>
          <li>
            <Link to="/workshops">Teacher</Link>
          </li>
          <li>
            <Link to="/libraries">Open Source Contributor</Link>
          </li>
        </LandingPageBackground>
      </div>
    </LandingPageBackground>
  );
};
