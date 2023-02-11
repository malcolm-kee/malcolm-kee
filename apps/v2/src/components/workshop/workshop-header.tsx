import { clsx } from 'clsx';
import * as React from 'react';
import type { WorkshopMetadata } from '~/data/workshop-data';
import type { WorkshopTocItem } from '~/data/workshop-helpers';
import { HomeIcon, ChevronLeftIcon } from '../icons';
import { ThemeSelector } from '../theme-selector';
import { WorkshopMobileNavigation } from './workshop-mobile-navigation';

export const WorkshopHeader = ({
  workshop,
  navItems,
  currentPath,
}: {
  workshop: WorkshopMetadata;
  navItems: Array<WorkshopTocItem>;
  currentPath: string;
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
        'sticky top-0 z-50 flex items-center justify-between bg-white px-4 py-5 lg:py-3 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none sm:px-6 lg:px-8',
        isScrolled
          ? 'dark:bg-slate-900/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75'
          : 'dark:bg-transparent'
      )}
    >
      <a
        href="/workshop"
        aria-label="Back to workshops"
        className="hidden lg:block lg:mr-3"
      >
        <ChevronLeftIcon className="w-5 h-5 stroke-slate-500" />
      </a>
      <div className="mr-6 flex lg:hidden">
        <WorkshopMobileNavigation
          items={navItems}
          currentPath={currentPath}
          icon={<img src={workshop.iconUrl} className="h-9 w-auto" />}
        />
      </div>
      <div className="flex shrink-0 flex-grow sm:basis-0 items-center">
        <img src={workshop.iconUrl} className="h-9 w-auto" />
      </div>
      <div className="hidden sm:block relative px-3 overflow-hidden">
        <span className="block w-full text-slate-700 dark:text-sky-100 truncate sm:text-center">
          {workshop.name}
        </span>
      </div>
      <div className="flex basis-0 justify-end items-center gap-6 sm:gap-8 sm:flex-grow ">
        <ThemeSelector className="relative z-10" />
        <a href="/" className="group" aria-label="Home">
          <HomeIcon className="w-6 h-6 text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300" />
        </a>
      </div>
    </header>
  );
};
