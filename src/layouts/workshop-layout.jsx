import React from 'react';
import { Footer } from '../components/footer';
import { SiteMetadata } from '../components/SiteMetadata';
import { Navbar } from '../components/workshop/navbar';

export const WorkshopLayout = ({
  workshopTitle,
  workshopRoot,
  workshopThemeColor,
  children
}) => (
  <div className="Layout">
    <SiteMetadata />
    <Navbar
      title={workshopTitle}
      linkTarget={workshopRoot}
      backgroundColor={workshopThemeColor}
    />
    {children}
    <Footer />
  </div>
);
