import cx from 'classnames';
import React from 'react';
import { content, contentLeft } from './footer.module.scss';
import { OutLink } from './OutLink';
import { useLastBuild } from '../hooks/use-last-build';

const year = new Date().getFullYear();

export const Footer = ({ left }) => {
  const lastBuild = useLastBuild();
  return (
    <footer>
      <div className={cx(content, left && contentLeft)}>
        <p>&copy; 2018-{year} Copyright Malcolm Kee. All rights reserved.</p>
        <p>
          <small>
            This site is built with{' '}
            <OutLink href="https://www.gatsbyjs.org/">Gatsby</OutLink> and
            hosted on <OutLink href="https://www.netlify.com/">Netlify</OutLink>
            . Last built on {lastBuild}.
          </small>
        </p>
        <p>
          <small>
            <a href="/sitemap.xml">Sitemap</a>
          </small>
        </p>
      </div>
    </footer>
  );
};
