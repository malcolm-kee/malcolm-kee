/* jsxImportSource: react */
import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { clsx } from 'clsx';
import * as React from 'react';
import { navItems } from '../data/nav';
import { Container } from './Container';
import styles from './Header.module.css';
import { HomeIconLink, Icon, IconContainer } from './HomeIconLink';
import { CloseIcon, TinyChevronDownIcon } from './icons';

export default function Header({
  isHomePage,
  currentPath,
  hideAvatar,
  hideNav,
}: {
  currentPath: string;
  isHomePage?: boolean;
  hideAvatar?: boolean;
  hideNav?: boolean;
}): React.ReactElement {
  const headerRef = React.useRef<HTMLDivElement>(null);
  const avatarRef = React.useRef<HTMLDivElement>(null);
  const isInitial = React.useRef(true);

  React.useEffect(() => {
    let downDelay = avatarRef.current?.offsetTop ?? 0;
    let upDelay = 64;

    function setProperty(property: string, value: string) {
      document.documentElement.style.setProperty(property, value);
    }

    function removeProperty(property: string) {
      document.documentElement.style.removeProperty(property);
    }

    function updateHeaderStyles() {
      if (!headerRef.current) {
        return;
      }
      let { top, height } = headerRef.current.getBoundingClientRect();
      let scrollY = clamp(window.scrollY, 0, document.body.scrollHeight - window.innerHeight);

      if (isInitial.current) {
        setProperty('--header-position', 'sticky');
      }

      setProperty('--content-offset', `${downDelay}px`);

      if (isInitial.current || scrollY < downDelay) {
        setProperty('--header-height', `${downDelay + height}px`);
        setProperty('--header-mb', `${-downDelay}px`);
      } else if (top + height < -upDelay) {
        let offset = Math.max(height, scrollY - upDelay);
        setProperty('--header-height', `${offset}px`);
        setProperty('--header-mb', `${height - offset}px`);
      } else if (top === 0) {
        setProperty('--header-height', `${scrollY + height}px`);
        setProperty('--header-mb', `${-scrollY}px`);
      }

      if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
        setProperty('--header-inner-position', 'fixed');
        removeProperty('--header-top');
        removeProperty('--avatar-top');
      } else {
        removeProperty('--header-inner-position');
        setProperty('--header-top', '0px');
        setProperty('--avatar-top', '0px');
      }
    }

    function updateAvatarStyles() {
      if (!isHomePage) {
        return;
      }

      let fromScale = 1;
      let toScale = 36 / 64;
      let fromX = 0;
      let toX = 2 / 16;

      let scrollY = downDelay - window.scrollY;

      let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale;
      scale = clamp(scale, fromScale, toScale);

      let x = (scrollY * (fromX - toX)) / downDelay + toX;
      x = clamp(x, fromX, toX);

      setProperty('--avatar-image-transform', `translate3d(${x}rem, 0, 0) scale(${scale})`);

      let borderScale = 1 / (toScale / scale);
      let borderX = (-toX + x) * borderScale;
      let borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`;

      setProperty('--avatar-border-transform', borderTransform);
      setProperty('--avatar-border-opacity', scale === toScale ? '1' : '0');
    }

    function updateStyles() {
      updateHeaderStyles();
      updateAvatarStyles();
      isInitial.current = false;
    }

    updateStyles();
    window.addEventListener('scroll', updateStyles, { passive: true });
    window.addEventListener('resize', updateStyles);

    return () => {
      window.removeEventListener('scroll', updateStyles);
      window.removeEventListener('resize', updateStyles);
    };
  }, [isHomePage]);

  const headerStyle = React.useMemo(
    () => ({
      height: `var(--header-height, ${isHomePage ? '196px' : 'auto'})`,
      marginBottom: 'var(--header-mb)',
    }),
    [isHomePage]
  );

  return (
    <>
      <header
        className="pointer-events-none relative z-50 flex flex-col print:hidden"
        style={headerStyle}
        data-current={currentPath}
      >
        {isHomePage && (
          <>
            <div
              ref={avatarRef}
              className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"
            />
            <Container
              className="top-0 order-last -mb-3 pt-3"
              style={{ position: 'var(--header-position)' } as object}
            >
              <div
                className="top-[var(--avatar-top,theme(spacing.3))] w-full px-4"
                style={{ position: 'var(--header-inner-position)' } as object}
              >
                <div className="relative">
                  <IconContainer
                    className="absolute left-0 top-3 origin-left transition-opacity"
                    style={{
                      opacity: 'var(--avatar-border-opacity, 0)',
                      transform: 'var(--avatar-border-transform)',
                    }}
                    isHomePage
                  />
                  <div
                    className="block h-16 w-16 origin-left"
                    style={{ transform: 'var(--avatar-image-transform)' }}
                  >
                    <Icon large className={styles.avatar} />
                  </div>
                </div>
              </div>
            </Container>
          </>
        )}
        <div
          className="top-0 z-10 h-[4.5rem] pt-6"
          style={
            {
              position: 'var(--header-position)',
            } as object
          }
          ref={headerRef}
        >
          <Container>
            <div className="relative flex gap-4">
              <div className="flex flex-1 pointer-events-auto">
                {!isHomePage && <HomeIconLink iconClass={styles.avatar} hideAvatar={hideAvatar} />}
              </div>
              {!hideNav && (
                <div className="flex flex-1 justify-end md:justify-center">
                  <MobileNavigation
                    currentPath={currentPath}
                    className={clsx('pointer-events-auto md:hidden', styles.mobileNav)}
                  />
                  <DesktopNavigation
                    currentPath={currentPath}
                    className={clsx('pointer-events-auto hidden md:block', styles.desktopNav)}
                  />
                </div>
              )}
              <div className="flex justify-end md:flex-1"></div>
            </div>
          </Container>
        </div>
      </header>
      {isHomePage && <div style={{ height: 'var(--content-offset)' }} />}
    </>
  );
}

function clamp(number: number, a: number, b: number) {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return Math.min(Math.max(number, min), max);
}

function NavItem({
  href,
  children,
  currentPath,
}: {
  href: string;
  children: React.ReactNode;
  currentPath: string;
}) {
  let isActive = currentPath && currentPath.startsWith(href);

  return (
    <li>
      <a
        href={href}
        className={clsx(
          'relative block px-3 py-2 transition',
          isActive ? 'text-primary-500' : 'hover:text-primary-500'
        )}
      >
        {children}
        {isActive && (
          <span
            className={clsx(
              'absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0',
              styles.desktopNavActiveIndicator
            )}
          />
        )}
      </a>
    </li>
  );
}

function DesktopNavigation({
  currentPath,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & { currentPath: string }) {
  return (
    <nav {...props}>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur">
        {navItems.map((item) => (
          <NavItem currentPath={currentPath} href={item.href} key={item.href}>
            {item.label}
          </NavItem>
        ))}
      </ul>
    </nav>
  );
}

function MobileNavItem({
  href,
  children,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
}) {
  return (
    <li className={clsx('group/navItem px-2 transition-colors', styles.mobileNavItem)}>
      <a
        href={href}
        className={clsx(
          'block py-2 border-b border-zinc-100 group-last/navItem:border-none [-webkit-tap-highlight-color:transparent]',
          isActive && 'text-primary-500'
        )}
      >
        {children}
      </a>
    </li>
  );
}

function MobileNavigation({ currentPath, ...props }: { className?: string; currentPath: string }) {
  return (
    <Popover {...props}>
      <PopoverButton className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur">
        Menu
        <TinyChevronDownIcon className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700" />
      </PopoverButton>
      <Transition>
        <TransitionChild
          as={React.Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <PopoverBackdrop className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm" />
        </TransitionChild>
        <TransitionChild
          as={React.Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <PopoverPanel
            focus
            className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white px-6 py-8 ring-1 ring-zinc-900/5"
          >
            <div className="float-right pr-4">
              <PopoverButton aria-label="Close menu" className="-m-1 p-1">
                <CloseIcon className="h-6 w-6 stroke-zinc-500" />
              </PopoverButton>
              <h2 className="sr-only" id="mobile-nav-label">
                Navigation
              </h2>
            </div>
            <nav aria-describedby="mobile-nav-label">
              <ul className="-my-2 text-base text-zinc-800">
                {navItems.map((item) => (
                  <MobileNavItem
                    href={item.href}
                    isActive={!!currentPath && currentPath.startsWith(item.href)}
                    key={item.href}
                  >
                    {item.label}
                  </MobileNavItem>
                ))}
              </ul>
            </nav>
          </PopoverPanel>
        </TransitionChild>
      </Transition>
    </Popover>
  );
}
