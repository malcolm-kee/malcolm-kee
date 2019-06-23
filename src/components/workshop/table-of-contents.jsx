import { Link } from 'gatsby';
import { joinClassName } from 'join-string';
import React from 'react';
import { useDiffEffect } from '../../hooks/use-diff-effect';
import { useEventListener } from '../../hooks/use-event-listener';
import { ChevronIcon } from '../chevron-icon';
import './table-of-contents.scss';
import { ToggleTocBtn } from './toggle-toc-btn';

// TODO: best way to handle tab when the section is collapsed
// for now we do nothing so that screen reader can tab though the TOC properly
// with the tradeoff of keyboard user will tab though hidden links :(

export const TableOfContents = ({ pathname, sections, themeColor }) => {
  const [open, setIsOpen] = React.useState(false);

  useEventListener('keyup', e => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  });
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const tocRef = React.useRef();
  const toggleBtnRef = React.useRef();

  useDiffEffect(
    prevDeps => {
      if (prevDeps) {
        const [prevOpen] = prevDeps;
        // we only do the focusing work if there is difference between the open state
        if (open && !prevOpen) {
          const activeLink =
            tocRef.current && tocRef.current.querySelector('.toc-link--active');
          activeLink && activeLink.focus();
        } else if (!open && prevOpen) {
          toggleBtnRef.current && toggleBtnRef.current.focus();
        }
      }
    },
    [open]
  );

  return (
    <>
      <nav
        className={joinClassName(
          'table-of-content-section',
          open && 'table-of-content-section--open'
        )}
      >
        <div className="table-of-content-inner-container">
          <ol ref={tocRef}>
            {sections.map(({ nodes, title }) => (
              <TableOfContentsSection
                nodes={nodes}
                title={title}
                pathname={pathname}
                key={title}
              />
            ))}
          </ol>
        </div>
      </nav>
      <ToggleTocBtn
        open={open}
        backgroundColor={themeColor}
        onToggle={() => setIsOpen(val => !val)}
        ref={toggleBtnRef}
      />
    </>
  );
};

const TableOfContentsSection = ({ nodes, title, pathname }) => {
  const withSection = title !== 'null';

  const [isActive, setIsActive] = React.useState(() =>
    nodes.some(node => node.frontmatter.path === pathname)
  );

  React.useEffect(() => {
    if (!isActive && nodes.some(node => node.frontmatter.path === pathname)) {
      setIsActive(true);
    }
  }, [pathname]);

  return (
    <React.Fragment key={title}>
      {withSection && (
        <li
          className={joinClassName(
            'toc-section-title',
            isActive && 'toc-section-title--active'
          )}
        >
          {/* TODO: Make this non clickable in small screen */}
          <button onClick={() => setIsActive(!isActive)}>
            {title} <ChevronIcon />
          </button>
        </li>
      )}
      {nodes.map(({ frontmatter: { title, path } }) => (
        <li
          className={joinClassName(
            'toc-link-item',
            isActive && 'toc-link-item--active-section'
          )}
          key={path}
        >
          <Link
            className="toc-link"
            activeClassName="toc-link--active"
            to={path}
          >
            {title}
          </Link>
        </li>
      ))}
    </React.Fragment>
  );
};
