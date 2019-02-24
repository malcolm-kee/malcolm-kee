import React from 'react';
import { Layout } from '../components/Layout';

const LayoutContainer = ({ children, pageContext }) => {
  return <Layout isRoot={pageContext.isRoot}>{children}</Layout>;
};

export default LayoutContainer;
