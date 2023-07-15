import * as React from 'react';
import { filterContents } from '~/data/filter-contents';
import type { ContentData } from '~/data/get-contents';
import { formatDate, isValidDate } from '~/lib/date';
import { clsx } from 'clsx';
import { setupShinyEffect } from '~/lib/shiny-effect';

export type ContentUpdatesProps = {
  contents: Array<ContentData>;
};

export const ContentUpdates = (props: ContentUpdatesProps) => {
  const [minDate, setMinDate] = React.useState<Date | undefined>(undefined);

  const displayedContents = React.useMemo(() => {
    if (minDate) {
      return filterContents(props.contents, minDate);
    }
  }, [minDate]);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.location) {
      const afterString = new URLSearchParams(location.search).get('after');
      const afterDate = afterString && new Date(afterString);

      if (isValidDate(afterDate)) {
        setMinDate(afterDate);
      }
    }
  }, []);

  if (displayedContents) {
    return (
      <div className="flex flex-col gap-10 @container/updates">
        {displayedContents.newContents.length > 0 && (
          <section>
            <h2 className="py-2 uppercase text-zinc-400 font-bold tracking-wide">New</h2>
            <List>
              {displayedContents.newContents.map((content) => (
                <UpdateItem content={content} type="new" key={content.id} />
              ))}
            </List>
          </section>
        )}
        {displayedContents.updatedContents.length > 0 && (
          <section>
            <h2 className="py-2 uppercase text-zinc-400 font-bold tracking-wide">Updated</h2>
            <List>
              {displayedContents.updatedContents.map((content) => (
                <UpdateItem content={content} type="updated" key={content.id} />
              ))}
            </List>
          </section>
        )}
      </div>
    );
  }

  return (
    <div className="pt-10 @container/updates">
      <List>
        {props.contents.map((content) => (
          <UpdateItem content={content} type="new" key={content.id} />
        ))}
      </List>
    </div>
  );
};

const List = (props: { children: React.ReactNode }) => (
  <ul
    {...props}
    className="flex flex-col gap-5 @lg/updates:border-l-2 @lg/updates:border-l-zinc-100"
  />
);

const UpdateItem = ({ content, type }: { content: ContentData; type: 'new' | 'updated' }) => {
  const date = type === 'new' ? content.pubDate : content.updatedDate;

  const coverRef = React.useRef<HTMLDivElement>(null);
  const linkRef = React.useRef<HTMLAnchorElement>(null);

  React.useEffect(() => {
    if (coverRef.current && linkRef.current) {
      return setupShinyEffect(coverRef.current, linkRef.current);
    }
  }, []);

  return (
    <li>
      <a
        href={content.url}
        className="block relative pt-1 pb-2 hover:bg-zinc-100 transition-colors cut-tr cut-x-8 cut-y-4"
        ref={linkRef}
      >
        <div className="absolute inset-0" ref={coverRef} />
        <div className="relative @lg/updates:px-3 @lg/updates:grid @lg/updates:grid-cols-4 @lg/updates:gap-6">
          {date ? (
            <time
              className={clsx(
                'block pl-3 text-sm leading-6 text-zinc-400 border-l-2 border-l-zinc-100',
                '@lg/updates:border-l-transparent @lg/updates:pl-0'
              )}
            >
              {formatDate(date, content.lang)}
            </time>
          ) : null}
          <div className="@lg/updates:col-span-3">
            <div className="text-lg font-medium font-techie">{content.title}</div>
            {content.description ? (
              <p className="text-sm text-zinc-500">{content.description}</p>
            ) : null}
          </div>
        </div>
      </a>
    </li>
  );
};
