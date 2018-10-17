import React from 'react';
import Helmet from 'react-helmet';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import './index.scss';

const Layout = ({ children }) => (
  <div className="Layout">
    <Helmet>
      <title>Malcolm Kee</title>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <meta name="description" content="Personal website of Malcolm Kee" />
      <meta name="keywords" content="Malcolm Kee, Frontend Engineer, ReactJS" />
    </Helmet>
    <Header siteTitle="Malcolm Kee" />
    {children}
    <Footer />
  </div>
);

export default Layout;
