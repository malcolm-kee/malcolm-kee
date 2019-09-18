import { Link } from 'gatsby';
import React from 'react';
import { Avatar } from './avatar';
import './LandingPageHeader.scss';

export const LandingPageHeader = () => {
  return (
    <div className="landing-page-header">
      <div className="landing-page-header-avatar">
        <Avatar />
      </div>
      <div className="landing-page-header-content">
        <ul className="landing-page-header-subtitle">
          <li>
            <Link to="/projects" className="animated">
              Frontend Engineer
            </Link>
          </li>
          <li>
            <Link to="/workshops" className="animated">
              Teacher
            </Link>
          </li>
          <li>
            <Link to="/libraries" className="animated">
              Open Source Contributor
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
