import React from 'react';
import { useRepositoryUrl } from '../hooks/use-repository-url';
import { OutLink } from './OutLink';
import './footer.scss';

const year = new Date().getFullYear();

export const Footer = () => {
  const repositoryUrl = useRepositoryUrl();
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2018-{year} Copyright Malcolm Kee. All rights reserved.</p>
        <p>
          <small>
            This site is built with{' '}
            <OutLink href="https://www.gatsbyjs.org/">Gatsby</OutLink> and
            hosted on <OutLink href="https://www.netlify.com/">Netlify</OutLink>.
            The source code is hosted on{' '}
            <OutLink href={repositoryUrl}>GitHub</OutLink>.
          </small>
        </p>
      </div>
    </footer>
  );
};
