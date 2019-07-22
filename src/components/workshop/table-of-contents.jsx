import cx from 'classnames';
import { Link } from 'gatsby';
import React from 'react';
import { useDiffEffect } from '../../hooks/use-diff-effect';
import { useEventListener } from '../../hooks/use-event-listener';
import { ChevronIcon } from '../chevron-icon';
import './table-of-contents.scss';
import { ToggleTocBtn } from './toggle-toc-btn';

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
        className={cx(
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
    nodes.some(node => node.fields.slug === pathname)
  );

  React.useEffect(() => {
    if (!isActive && nodes.some(node => node.fields.slug === pathname)) {
      setIsActive(true);
    }
  }, [pathname]);

  return (
    <>
      {withSection && (
        <li
          className={cx(
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
      {nodes.map(({ frontmatter: { title }, fields: { slug } }) => (
        <li
          className={cx(
            'toc-link-item',
            isActive && 'toc-link-item--active-section'
          )}
          key={slug}
        >
          <Link
            className="toc-link"
            activeClassName="toc-link--active"
            to={slug}
            onFocus={isActive ? undefined : () => setIsActive(true)}
          >
            {title}
          </Link>
        </li>
      ))}
    </>
  );
};
