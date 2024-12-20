import type { MarkdownHeading } from 'astro';
import { clsx } from 'clsx';
import * as React from 'react';
import { isNotNil } from '~/lib/type-guard';

export const WorkshopHeadings = ({ headings }: { headings: Array<MarkdownHeading> }) => {
  const [activeId, setActiveId] = React.useState(() => headings[0]?.slug);

  const getHeadingsTop = React.useCallback((headings: Array<MarkdownHeading>) => {
    return headings
      .map(({ slug }) => {
        const el = document.getElementById(slug);

        if (!el) return null;

        const style = window.getComputedStyle(el);
        const scrollMt = parseFloat(style.scrollMarginTop);

        const top = window.scrollY + el.getBoundingClientRect().top - scrollMt;

        return {
          slug,
          top,
        };
      })
      .filter(isNotNil);
  }, []);

  React.useEffect(() => {
    if (headings.length === 0) return;
    const headingsTop = getHeadingsTop(headings);
    function onScroll() {
      let top = window.scrollY;
      if (headingsTop.length > 0) {
        let current = headingsTop[0]!.slug;
        for (let heading of headingsTop) {
          if (top >= heading.top) {
            current = heading.slug;
          } else {
            break;
          }
        }
        setActiveId(current);
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [getHeadingsTop, headings]);

  return (
    <div className="hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
      <nav aria-labelledby="on-this-page-title" className="w-56">
        {headings.length > 0 && (
          <>
            <h2
              id="on-this-page-title"
              className="font-techie uppercase tracking-wide text-sm font-medium text-slate-900 dark:text-white"
            >
              On this page
            </h2>
            <ol className="mt-4 text-sm">
              {headings.map((heading) => (
                <li
                  className={clsx(
                    'py-2',
                    {
                      3: 'pl-4',
                      4: 'pl-8',
                      5: 'pl-12',
                      6: 'pl-16',
                    }[heading.depth],
                    heading.depth >= 3 && 'border-l border-slate-200 dark:border-slate-600'
                  )}
                  key={heading.slug}
                >
                  <h3>
                    <a
                      href={`#${heading.slug}`}
                      className={
                        heading.slug === activeId
                          ? 'text-sky-500'
                          : 'font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                      }
                    >
                      {heading.text}
                    </a>
                  </h3>
                </li>
              ))}
            </ol>
          </>
        )}
      </nav>
    </div>
  );
};
