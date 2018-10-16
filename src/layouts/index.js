import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import './index.scss';

const Layout = ({ children, data }) => (
  <div className="Layout">
    <Helmet>
      <title>{data.site.siteMetadata.title}</title>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <meta name="description" content="Personal website of Malcolm Kee" />
      <meta name="keywords" content="Malcolm Kee, Frontend Engineer, ReactJS" />
    </Helmet>
    <Header siteTitle={data.site.siteMetadata.title} />
    {children()}
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.func,
};

export default Layout;

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
