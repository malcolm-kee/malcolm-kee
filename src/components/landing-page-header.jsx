import { Link } from 'gatsby';
import * as React from 'react';
import { Avatar } from './avatar';
import styles from './landing-page-header.module.scss';

export const LandingPageHeader = () => {
  return (
    <div className={styles.root}>
      <div className={styles.avatar}>
        <Avatar />
      </div>
      <div className="relative">
        <h1
          className={`text-primary-500 font-medium xs:pt-6 px-6 sm:px-10 md:text-center md:pt-0 md:absolute md:w-full ${styles.title}`}
        >
          Malcolm Kee
        </h1>
      </div>
      <div className={`pt-8 pb-8 xs:pt-4 xs:pb-0 md:pt-12 ${styles.content}`}>
        <ul className={styles.subtitle}>
          <li>
            <Link to="/projects" className="md:text-lg animated">
              Frontend Engineer
            </Link>
          </li>
          <li>
            <Link to="/workshops" className="md:text-lg animated">
              Teacher
            </Link>
          </li>
          <li>
            <Link to="/libraries" className="md:text-lg animated">
              Open Source Contributor
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
