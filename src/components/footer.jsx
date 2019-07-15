import cx from 'classnames';
import React from 'react';
import { useRepositoryUrl } from '../hooks/use-repository-url';
import { content, contentLeft } from './footer.module.scss';
import { OutLink } from './OutLink';

const year = new Date().getFullYear();

export const Footer = ({ left }) => {
  const repositoryUrl = useRepositoryUrl();
  return (
    <footer>
      <div className={cx(content, left && contentLeft)}>
        <p>&copy; 2018-{year} Copyright Malcolm Kee. All rights reserved.</p>
        <p>
          <small>
            This site is built with{' '}
            <OutLink href="https://www.gatsbyjs.org/">Gatsby</OutLink> and
            hosted on <OutLink href="https://www.netlify.com/">Netlify</OutLink>
            . The source code is hosted on{' '}
            <OutLink href={repositoryUrl}>GitHub</OutLink>.
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
