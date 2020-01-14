import { Link } from 'gatsby';
import React from 'react';
import { Avatar } from './avatar';
import styles from './landing-page-header.module.scss';

export const LandingPageHeader = () => {
  return (
    <div className={styles.root}>
      <div className={styles.avatar}>
        <Avatar />
      </div>
      <div className="relative">
        <div className="text-3xl text-primary-500 font-medium xs:pt-6 px-6 sm:px-10 sm:text-4xl md:text-6xl md:text-center md:pt-0 md:top-0 md:absolute md:w-full">
          Malcolm Kee
        </div>
      </div>
      <div className={`pt-8 pb-8 xs:pt-4 xs:pb-0 md:pt-12 ${styles.content}`}>
        <ul className={styles.subtitle}>
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
