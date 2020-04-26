import * as React from 'react';
import { Footer } from '../components/footer';
import { Navbar } from '../components/workshop/navbar';
import { TableOfContents } from '../components/workshop/table-of-contents';

export const WorkshopLayout = ({ location, pageContext, children }) => {
  const { workshop, lessonGroup } = pageContext;

  return (
    <div className="Layout">
      {workshop && <Navbar workshop={workshop} />}
      {children}
      {workshop && (
        <TableOfContents
          sections={lessonGroup}
          workshop={workshop}
          pathname={location.pathname}
        />
      )}
      <Footer align="right" />
    </div>
  );
};
