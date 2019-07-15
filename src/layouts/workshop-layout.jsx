import React from 'react';
import { Footer } from '../components/footer';
import { Navbar } from '../components/workshop/navbar';
import { TableOfContents } from '../components/workshop/table-of-contents';

export const WorkshopLayout = ({
  workshopTitle,
  workshopRoot,
  workshopThemeColor,
  workshopSections,
  pathname,
  children,
}) => (
  <div className="Layout">
    <Navbar
      title={workshopTitle}
      linkTarget={workshopRoot}
      backgroundColor={workshopThemeColor}
    />
    {children}
    <TableOfContents
      sections={workshopSections}
      themeColor={workshopThemeColor}
      pathname={pathname}
    />
    <Footer left />
  </div>
);
