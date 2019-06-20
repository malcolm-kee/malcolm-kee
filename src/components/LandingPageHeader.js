import { Link } from 'gatsby';
import React from 'react';
import { Avatar } from './avatar';
import './LandingPageHeader.scss';

export const LandingPageHeader = () => {
  return (
    <header className="landing-page-header">
      <div className="landing-page-header-avatar">
        <Avatar />
      </div>
      <div className="landing-page-header-content">
        <ul className="landing-page-header-subtitle">
          <li>
            <Link to="/projects">Frontend Engineer</Link>
          </li>
          <li>
            <Link to="/workshops">Teacher</Link>
          </li>
          <li>
            <Link to="/libraries">Open Source Contributor</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
