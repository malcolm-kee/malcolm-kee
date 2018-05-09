import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { Header } from '../components/Header';
import './index.scss';

const Layout = ({ children, data }) => (
  <div className="Layout">
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Personal website of Malcolm Kee' },
        {
          name: 'keywords',
          content: 'Malcolm Kee, Frontend Engineer, ReactJS',
        },
      ]}
    >
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
    </Helmet>
    <Header siteTitle={data.site.siteMetadata.title} />
    <main>{children()}</main>
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
