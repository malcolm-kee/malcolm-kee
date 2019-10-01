import React from 'react';
import { Footer } from '../components/footer';
import { Navbar } from '../components/workshop/navbar';
import { TableOfContents } from '../components/workshop/table-of-contents';

export const WorkshopLayout = ({
  workshopSections,
  workshop,
  pathname,
  children,
}) => (
  <div className="Layout">
    <Navbar
      title={workshop.name}
      linkTarget={`/${workshop.id}`}
      backgroundColor={workshop.themeColor}
    />
    {children}
    <TableOfContents
      sections={workshopSections}
      themeColor={workshop.themeColor}
      pathname={pathname}
    />
    <Footer left />
  </div>
);
