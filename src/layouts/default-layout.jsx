import React from 'react';
import { Footer } from '../components/footer';
import { Header } from '../components/Header';

export const Layout = ({ isRoot, children }) => (
  <div className="Layout">
    <Header siteTitle="Malcolm Kee" isBanner={isRoot} />
    {children}
    <Footer />
  </div>
);
