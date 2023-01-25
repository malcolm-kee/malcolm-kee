import * as React from 'react';
import { Dialog } from '@headlessui/react';
import type { WorkshopTocItem } from '~/data/workshop-helpers';
import { MenuIcon, CloseIcon } from '../icons';
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
      <Dialog
        open={isOpen}
        onClose={setIsOpen}
        className="fixed inset-0 z-50 flex items-start overflow-y-auto bg-slate-900/50 pr-10 backdrop-blur lg:hidden"
        aria-label="Navigation"
      >
        <Dialog.Panel className="min-h-full w-full max-w-xs bg-white px-4 pt-5 pb-12 dark:bg-slate-900 sm:px-6">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation"
            >
              <CloseIcon className="h-6 w-6 stroke-slate-500" />
            </button>
            <div className="ml-6">{props.icon}</div>
          </div>
          <WorkshopNavigation
            currentPath={props.currentPath}
            items={props.items}
            className="mt-5 px-1"
          />
        </Dialog.Panel>
      </Dialog>
    </>
  );
};
