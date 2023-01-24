import * as React from 'react';
import { clsx } from 'clsx';
import type { WorkshopMetadata } from '~/data/workshop-helpers';
import { HomeIconLink } from '../HomeIconLink';

export const WorkshopHeader = ({
  workshop,
}: {
  workshop: WorkshopMetadata;
}) => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 flex flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none sm:px-6 lg:px-8',
        isScrolled
          ? 'dark:bg-slate-900/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75'
          : 'dark:bg-transparent'
      )}
    >
      <div className="relative flex flex-grow basis-0 justify-center items-center">
        <span className="text-slate-700 dark:text-sky-100">
          {workshop.name}
        </span>
      </div>
      <div className="hidden md:flex md:items-center absolute left-4 md:left-8 inset-0 w-64">
        <HomeIconLink />
      </div>
    </header>
  );
};
