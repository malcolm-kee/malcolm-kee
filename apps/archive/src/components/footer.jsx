import cx from 'classnames';
import * as React from 'react';
import styles from './footer.module.scss';
import { OutLink } from './OutLink';
import { useLastBuild } from '../hooks/use-last-build';

const year = new Date().getFullYear();

export const Footer = ({ align }) => {
  const lastBuild = useLastBuild();
  return (
    <footer>
      <div
        className={cx(
          styles.content,
          align === 'left' && styles.contentLeft,
          align === 'right' && styles.contentRight
        )}
      >
        <p>&copy; 2018-{year} Copyright Malcolm Kee. All rights reserved.</p>
        <p>
          <small>
            This site is built with{' '}
            <OutLink href="https://www.gatsbyjs.org/">Gatsby</OutLink> and
            hosted on <OutLink href="https://www.netlify.com/">Netlify</OutLink>
            . Last built on {lastBuild}.
          </small>
        </p>
      </div>
    </footer>
  );
};
