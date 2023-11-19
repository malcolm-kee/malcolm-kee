import { clsx } from 'clsx';
import * as React from 'react';
import type { BlogData } from '~/data/offline-db';
import { loadSavedPages, type PageInfo } from '~/data/offline-helpers';
import { setupShinyEffect } from '~/lib/shiny-effect';

export const SavedPages = () => {
  const [savedBlogs, setSavedBlogs] = React.useState<BlogData[]>([]);

  React.useEffect(() => {
    loadSavedPages().then((blogs) =>
      setSavedBlogs(blogs.filter((blog) => 'title' in blog.info && 'path' in blog.info))
    );
  }, []);

  return savedBlogs && savedBlogs.length > 0 ? (
    <section>
      <h2 className="px-3 py-1 md:px-6 font-semibold text-zinc-500">Saved pages</h2>
      <ul className="flex flex-col gap-1 text-left">
        {savedBlogs.map((blog) => (
          <PageItem info={blog.info as PageInfo} key={blog.path} />
        ))}
      </ul>
    </section>
  ) : null;
};

const PageItem = ({ info }: { info: PageInfo }) => {
  const hoverBgRef = React.useRef<HTMLDivElement>(null);
  const linkRef = React.useRef<HTMLAnchorElement>(null);

  React.useEffect(() => {
    if (hoverBgRef.current && linkRef.current) {
      return setupShinyEffect(hoverBgRef.current, linkRef.current);
    }
  }, []);

  return (
    <li>
      <a href={info.path} className="relative block px-3 md:px-6 py-6 group/link" ref={linkRef}>
        <div
          className={clsx(
            'absolute top-0 right-0 bottom-0 left-0 rounded-2xl transition opacity-0 scale-95',
            'group-hover/link:bg-zinc-50 group-hover/link:opacity-100 group-hover/link:scale-100 group-hover/link:duration-300'
          )}
          ref={hoverBgRef}
        />
        <div className="relative">
          <h3 className="font-medium text-zinc-900">{info.title}</h3>
          {info.description && <p className="mt-2 text-sm text-zinc-500">{info.description}</p>}
        </div>
      </a>
    </li>
  );
};
