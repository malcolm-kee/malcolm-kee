import type * as React from 'react';
import type { QueryKey } from '@tanstack/react-query';

export type PageComponent = React.ComponentType<{}>;

export type QueryOptions = {
  queryKey: QueryKey;
  queryFn: (info: { signal?: AbortSignal }) => Promise<unknown>;
};

export type GetStaticData = () => Promise<{
  title?: string;
  prefetchQueries?: Array<QueryOptions>;
}>;

export type PageExports = {
  default?: PageComponent;
  getStaticData?: GetStaticData;
};
