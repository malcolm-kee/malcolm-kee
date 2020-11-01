import * as React from 'react';
import { Footer } from '../components/footer';
import { Navbar } from '../components/workshop/navbar';
import { TableOfContents } from '../components/workshop/table-of-contents';

/**
 * WorkshopLayout is needed because we want to have nice animation
 * when going from a lesson to another lesson.
 *
 * If the fancy animation is no longer needed, this can be removed.
 */
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
