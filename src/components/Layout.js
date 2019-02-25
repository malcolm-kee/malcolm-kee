import React from 'react';
import { Header } from './Header';
import { SiteMetadata } from './SiteMetadata';

export const Layout = ({ isRoot, children }) => (
  <div className="Layout">
    <SiteMetadata />
    <Header siteTitle="Malcolm Kee" isBanner={isRoot} />
    {children}
  </div>
);
