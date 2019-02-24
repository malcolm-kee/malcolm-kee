import React from 'react';
import Helmet from 'react-helmet';
import { Header } from './Header';
import { SiteMetadata } from './SiteMetadata';

export const Layout = ({ isRoot, children }) => (
  <div className="Layout">
    <SiteMetadata />
    <Helmet>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
    </Helmet>
    <Header siteTitle="Malcolm Kee" isBanner={isRoot} />
    {children}
  </div>
);
