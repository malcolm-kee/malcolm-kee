import React from 'react';
import { Footer } from '../components/footer';
import { Header } from '../components/Header';

export const Layout = ({ isRoot, children }) => (
  <div className="Layout">
    {!isRoot && <Header siteTitle="Malcolm Kee" />}
    {children}
    <Footer />
  </div>
);
