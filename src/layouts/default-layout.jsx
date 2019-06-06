import React from 'react';
import { Footer } from '../components/footer';
import { Header } from '../components/Header';
import { SiteMetadata } from '../components/SiteMetadata';

export const Layout = ({ isRoot, children }) => (
  <div className="Layout">
    <SiteMetadata />
    <Header siteTitle="Malcolm Kee" isBanner={isRoot} />
    {children}
    <Footer />
  </div>
);
