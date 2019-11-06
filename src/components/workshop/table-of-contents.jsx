import cx from 'classnames';
import { Link } from 'gatsby';
import React from 'react';
import { useDiffEffect } from '../../hooks/use-diff-effect';
import { useWindowEventListener } from '../../hooks/use-event-listener';
import { ChevronIcon } from '../chevron-icon';
import './table-of-contents.scss';
import { ToggleTocBtn } from './toggle-toc-btn';

export const TableOfContents = ({ pathname, sections, workshop }) => {
  const [open, setIsOpen] = React.useState(false);

  useWindowEventListener('keyup', e => {
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
        aria-label="workshop table of contents"
        id="workshop-toc"
      >
        <div className="table-of-content-inner-container">
          <div
            className="table-of-content-workshop-title"
            style={{
              color: workshop.themeColor,
              backgroundColor: workshop.contrastColor,
            }}
          >
            <img src={workshop.icon} alt="" />
            {workshop.name}
          </div>
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
        backgroundColor={workshop.themeColor}
        color={workshop.contrastColor}
        onToggle={() => setIsOpen(val => !val)}
        ref={toggleBtnRef}
        aria-haspopup="dialog"
      />
    </>
  );
};

const TableOfContentsSection = ({ nodes, title, pathname }) => {
  const withSection = title !== 'null';

  const [isActive, setIsActive] = React.useState(() =>
    nodes.some(node => node.slug === pathname)
  );
  const activateRef = React.useRef(null);
  activateRef.current = function() {
    if (!isActive && nodes.some(node => node.slug === pathname)) {
      setIsActive(true);
    }
  };

  React.useEffect(() => {
    activateRef.current();
  }, [pathname]);

  return (
    <>
      {withSection && (
        <li
          className={cx(
            'toc-section-title',
            isActive && 'toc-section-title--active animated'
          )}
        >
          {/* TODO: Make this non clickable in small screen */}
          <button onClick={() => setIsActive(!isActive)}>
            {title} <ChevronIcon />
          </button>
        </li>
      )}
      {nodes.map(({ title, slug }) => (
        <li
          className={cx(
            'toc-link-item animated',
            isActive && 'toc-link-item--active-section'
          )}
          key={slug}
        >
          <Link
            className="toc-link animated"
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
