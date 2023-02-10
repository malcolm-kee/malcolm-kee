import * as React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import type { WorkshopTocItem } from '~/data/workshop-helpers';
import { MenuIcon, CloseIcon, ChevronLeftIcon } from '../icons';
import { WorkshopNavigation } from './workshop-navigation';

export const WorkshopMobileNavigation = (props: {
  items: Array<WorkshopTocItem>;
  currentPath: string;
  icon: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative"
        aria-label="Open navigation"
      >
        <MenuIcon className="w-6 h-6 stroke-slate-500" />
      </button>
      <Transition
        show={isOpen}
        enter="transition duration-100 ease-out"
        enterFrom="transform backdrop-blur-none"
        enterTo="transform backdrop-blur"
        leave="transition duration-75 ease-out"
        leaveFrom="transform backdrop-blur"
        leaveTo="transform backdrop-blur-none"
        as={React.Fragment}
      >
        <Dialog
          onClose={setIsOpen}
          className="fixed inset-0 z-50 flex items-start overflow-y-auto bg-slate-900/50 pr-10 lg:hidden"
          aria-label="Navigation"
        >
          <Dialog.Panel className="flex flex-col h-full w-full overflow-hidden max-w-xs bg-white dark:bg-slate-900">
            <div className="flex items-center px-4 sm:px-6 py-5">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation"
              >
                <CloseIcon className="h-6 w-6 stroke-slate-500" />
              </button>
              <div className="ml-6">{props.icon}</div>
            </div>
            <Transition.Child
              enter="transition duration-100 ease-out"
              enterFrom="transform -translate-x-full"
              enterTo="transform translate-x-0"
              leave="transition duration-75 ease-out"
              leaveFrom="transform translate-x-0"
              leaveTo="transform -translate-x-full"
              as={React.Fragment}
            >
              <WorkshopNavigation
                currentPath={props.currentPath}
                items={props.items}
                className="px-5 sm:px-7 flex-1 overflow-x-auto"
                headingClass="top-0"
              />
            </Transition.Child>
            <div className="pt-3 pb-6 px-4 sm:px-6">
              <a
                className="flex items-center gap-2 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                href="/workshop"
              >
                <ChevronLeftIcon className="w-5 h-5" /> All Workshops
              </a>
            </div>
          </Dialog.Panel>
        </Dialog>
      </Transition>
    </>
  );
};
