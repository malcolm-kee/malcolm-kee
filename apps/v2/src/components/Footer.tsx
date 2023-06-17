import * as React from 'react';
import { Container } from './Container';
import { navItems } from '../data/nav';
import { RssIcon } from './icons';
import { clsx } from 'clsx';

const year = new Date().getFullYear();

export default function Footer(props: { hideNav?: boolean }): React.ReactElement {
  return (
    <footer className="mt-32 print:hidden">
      <Container.Outer>
        <div className="border-t border-zinc-100 pt-10 pb-16">
          <Container.Inner>
            <div
              className={clsx(
                'flex flex-col items-center justify-between gap-6',
                !props.hideNav && 'lg:flex-row'
              )}
            >
              {!props.hideNav && (
                <div className="flex gap-6 text-sm font-medium text-zinc-800 flex-wrap">
                  {navItems.map((item) => (
                    <a
                      href={item.href}
                      className="transition hover:text-primary-500"
                      key={item.href}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
              <div className="flex flex-col md:flex-row items-center gap-6">
                {!props.hideNav && (
                  <a
                    href="/rss.xml"
                    className="flex-none inline-flex gap-1 items-center text-sm text-zinc-500 px-3"
                  >
                    <RssIcon className="w-5 h-5" />
                    RSS Feed
                  </a>
                )}
                <p className="text-sm text-center text-zinc-400">
                  &copy; 2018-{year} Copyright Malcolm Kee.{' '}
                  <span className="inline-block">All rights reserved.</span>
                </p>
              </div>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  );
}
