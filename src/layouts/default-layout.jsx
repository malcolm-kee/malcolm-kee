import React from 'react';
import { Footer } from '../components/footer';
import { Header } from '../components/Header';
import { Seo } from '../components/Seo';

export const Layout = ({ isRoot, children }) => (
  <div className="Layout">
    <Seo />
    <Header siteTitle="Malcolm Kee" isBanner={isRoot} />
    {children}
    <Footer />
  </div>
);
