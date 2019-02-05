import React from 'react';
import './LandingPageHeader.scss';

export const LandingPageHeader = () => (
  <header className="landing-page-header">
    <div className="landing-page-header-content">
      <h1 className="landing-page-header-title">Malcolm Kee</h1>
      <ul className="landing-page-header-subtitle">
        <li>
          <span>Frontend Engineer</span>
        </li>
        <li>
          <span>Open Source Contributor</span>
        </li>
        <li>
          <span>Trainer</span>
        </li>
      </ul>
    </div>
  </header>
);
